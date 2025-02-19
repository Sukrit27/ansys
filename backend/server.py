from flask import Flask, request, jsonify, send_file
import ansys.fluent.core as pyfluent
import os
import json

app = Flask(__name__)

# Create results folder if not exists
os.makedirs("results", exist_ok=True)

@app.route('/run_simulation', methods=['POST'])
def run_simulation():
    try:
        # Get JSON data from frontend
        data = request.json
        rpm = data.get("rpm")
        velocity_x = data.get("velocity_x")
        velocity_y = data.get("velocity_y")
        velocity_z = data.get("velocity_z")

        print(f"Received: RPM={rpm}, Velocity=({velocity_x}, {velocity_y}, {velocity_z})")

        # Start Fluent session
        fluent_session = pyfluent.launch_fluent(mode="solver", precision="double", dimension=3)

        # Load base case
        base_case_file = "base_case.cas.h5"
        fluent_session.file.read(base_case_file)

        # Update RPM
        fluent_session.setup.boundary_conditions.velocity["rotating_part"].rpm = rpm

        # Update Translational Velocity
        fluent_session.setup.boundary_conditions.velocity["moving_part"].components = {
            "x": velocity_x,
            "y": velocity_y,
            "z": velocity_z
        }

        print(f"Set RPM: {rpm}")
        print(f"Set Translational Velocity: {velocity_x}, {velocity_y}, {velocity_z}")

        # Run Simulation (200 iterations)
        fluent_session.solution.run_calculation.iterate(200)

        # Extract Results
        temperature_result = fluent_session.results.get_data("temperature")

        # Save Contour Image
        contour_filename = f"results/simulation_contour.png"
        fluent_session.results.graphics.contour("temperature").save_as(contour_filename)

        # Save Results to JSON
        result_data = {
            "rpm": rpm,
            "velocity_x": velocity_x,
            "velocity_y": velocity_y,
            "velocity_z": velocity_z,
            "temperature_result": temperature_result,
            "contour": contour_filename
        }
        
        json_filename = f"results/simulation_results.json"
        with open(json_filename, "w") as json_file:
            json.dump(result_data, json_file)

        print("Simulation Completed. Results saved.")

        # Close Fluent session
        fluent_session.exit()

        return jsonify({"message": "Simulation completed", "results": result_data})

    except Exception as e:
        return jsonify({"error": str(e)})

@app.route('/get_contour', methods=['GET'])
def get_contour():
    return send_file("results/simulation_contour.png", mimetype='image/png')

if __name__ == '__main__':
    app.run(debug=True)
