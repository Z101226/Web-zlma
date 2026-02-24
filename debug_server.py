import sys
print("Python executable:", sys.executable)
print("Python version:", sys.version)

try:
    from flask import Flask
    print("Flask imported successfully")
    print("Flask version:", Flask.__version__)
except Exception as e:
    print("Error importing Flask:", e)

app = Flask(__name__)

@app.route('/')
def hello():
    return 'Flask is running!'

if __name__ == '__main__':
    print("Starting Flask server on http://0.0.0.0:5000")
    app.run(debug=True, host='0.0.0.0', port=5000)
