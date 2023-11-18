from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
import os
import pandas as pd
import mysql.connector
from flask_cors import CORS
from datetime import datetime
app = Flask(__name__)
CORS(app)
app.config['UPLOAD_FOLDER'] = 'uploads'

mydb = mysql.connector.connect(
  host="localhost",
  user="root",
  password="",
  database="VeeTech"
)

mycursor = mydb.cursor()

def allowed_file(filename):
    ALLOWED_EXTENSIONS = {'xlsx'}
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    file = request.files['file']
    if file and allowed_file(file.filename):
        filename = 'my_file.xlsx'
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        file_path = './uploads/my_file.xlsx'
        df = pd.read_excel(file_path)
        for index, row in df.iterrows():
            id = int(row['id'])
            employee_id = int(row['employee_id'])
            employee_name = str(row['employee_name'])
            phone = int(row['Phone'])
            mail = str(row['mail'])
            address = str(row['address'])
            employee_dob = row['employee_dob'].strftime('%Y-%m-%d %H:%M:%S')
            passport_number = int(row['passport_number'])
            expiry_date = row['expiry_date'].strftime('%Y-%m-%d %H:%M:%S')
            passport_name = str(row['passport_name'])
            aadhar_number = int(row['aadhar_number'])
            dl_number = int(row['dl_number'])
            pan_number = int(row['pan_number'])
            created_date = row['created_date'].strftime('%Y-%m-%d %H:%M:%S')
            last_updated_date = row['last_updated_date'].strftime('%Y-%m-%d %H:%M:%S')
            created_time = row['created_time'].strftime('%H:%M:%S')
            last_updated_time = row['last_updated_time'].strftime('%H:%M:%S')
            company_id = int(row['company_id'])
            designation_id = int(row['designation_id'])
            approver_level_id = int(row['approver_level_id'])
            department_id = int(row['department_id'])

            sql = """INSERT INTO employee_table 
             (employee_id, employee_name, Phone, mail, address, employee_dob, 
             passport_number, expiry_date, passport_name, aadhar_number, dl_number, 
             pan_number, created_date, last_updated_date, created_time, last_updated_time, 
             company_id, designation_id, approver_level_id, department_id) 
             VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"""

            values = (
                employee_id, employee_name, phone, mail, address, employee_dob, passport_number, 
                expiry_date, passport_name, aadhar_number, dl_number, pan_number, created_date, 
                last_updated_date, created_time, last_updated_time, company_id, designation_id, 
                approver_level_id, department_id
            )
            try:
                mycursor.execute(sql, values)
                # Commit the changes
                mydb.commit()
                
            except mysql.connector.Error as err:
                print(f"Error: {err}")
            
        for index, row in df.iterrows():
            mail = str(row['mail'])
            employee_id = int(row['employee_id'])
            company_id = int(row['company_id'])
            sql="""INSERT INTO login_table(email,password,employee_id,company_id) VALUES(%s,%s,%s,%s)"""
            password = '123'
            values = (
                mail, password, employee_id, company_id
            )
            try:
                mycursor.execute(sql, values)
                mydb.commit()
            except mysql.connector.Error as err:
                print(f"Error: {err}")
        for index, row in df.iterrows():
            employee_id = int(row['employee_id'])
            approver_employee_ids = row['approver_employee_id'].split(',')

            # Fetch 'id' from 'employee_table' for 'employee_id'
            fetch_id_sql = "SELECT id FROM employee_table WHERE employee_id = %s"
            fetch_id_values = (employee_id,)
            mycursor.execute(fetch_id_sql, fetch_id_values)
            employee_id_value = mycursor.fetchone()

            if not employee_id_value:
                print(f"Employee ID {employee_id} not found in the 'employee_table'")
                continue

            empId = employee_id_value[0]
            approverIds = []

            # Fetch 'id' from 'employee_table' for each 'approver_employee_id'
            for approver_id in approver_employee_ids:
                fetch_id_values = (int(approver_id),)
                mycursor.execute(fetch_id_sql, fetch_id_values)
                approver_id_value = mycursor.fetchone()
                if approver_id_value:
                    approverIds.append(approver_id_value[0])

            # Insert into the approver_mapping_table for each combination of empId and approverIds
            for approver_id in approverIds:
                sql = "INSERT INTO approver_mapping_table (employee_id, approver_employee_id) VALUES (%s, %s)"
                values = (empId, approver_id)
                try:
                    mycursor.execute(sql, values)
                    mydb.commit()
                except mysql.connector.Error as err:
                    print(f"Error inserting into approver_mapping_table: {err}")

        return jsonify({'message': 'File uploaded successfully', 'filename': filename}), 200

    return jsonify({'error': 'Invalid file or file type'}), 400

if __name__ == '__main__':
    app.run(debug=True)
