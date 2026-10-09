from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin

import BackEnd.Functions as CallMethod
import BackEnd.GlobalInfo.ResponseMessages as Messages

# Instancia
app = Flask(__name__)
CORS(app)

@app.route('/')
@cross_origin(allow_headers=['Content-Type'])
def Getmessage():
    try:
        objResult = CallMethod.fnMesajeGet()
        return objResult
    except Exception as e:
        print("Error en Getmessage:", e)
        return jsonify(Messages.err500)

# 1. RUTAS DE USUARIOS

@app.route('/getUsers', methods=['GET'])
@cross_origin(allow_headers=['Content-Type'])
def GetUsers():
    try:
        objResult = CallMethod.fnGetUsers()
        return objResult
    except Exception as e:
        print("Error en GetUsers:", e)
        return jsonify(Messages.err500)

@app.route('/users', methods=['POST'])
def PostUser():
    return CallMethod.fnInsertUser(request.get_json(silent=True) or {})

@app.route('/users/<strId>', methods=['PUT'])
def PutUser(strId):
    return CallMethod.fnUpdateUser(
        strId,
        request.get_json(silent=True) or {}
    )

@app.route('/users/<strId>', methods=['DELETE'])
def DeleteUser(strId):
    return CallMethod.fnDeleteUser(strId)

# 2. RUTAS DE CULTIVOS

@app.route('/getCultivos', methods=['GET'])
@cross_origin(allow_headers=['Content-Type'])
def GetCultivos():
    try:
        objResult = CallMethod.fnGetCultivos()
        return objResult
    except Exception as e:
        print("Error en GetCultivos:", e)
        return jsonify(Messages.err500)

@app.route('/cultivos', methods=['POST'])
def PostCultivo():
    return CallMethod.fnInsertCultivo(request.get_json(silent=True) or {})

@app.route('/cultivos/<strId>', methods=['PUT'])
def PutCultivo(strId):
    return CallMethod.fnUpdateCultivo(
        strId,
        request.get_json(silent=True) or {}
    )

@app.route('/cultivos/<strId>', methods=['DELETE'])
def DeleteCultivo(strId):
    return CallMethod.fnDeleteCultivo(strId)

# 3. RUTAS DE SISTEMA IOT

@app.route('/getSistemaIoT', methods=['GET'])
@cross_origin(allow_headers=['Content-Type'])
def GetSistemaIoT():
    try:
        objResult = CallMethod.fnGetSistemaIoT()
        return objResult
    except Exception as e:
        print("Error en GetSistemaIoT:", e)
        return jsonify(Messages.err500)

@app.route('/sistemaiot', methods=['POST'])
def PostSistemaIoT():
    return CallMethod.fnInsertSistemaIoT(request.get_json(silent=True) or {})

@app.route('/sistemaiot/<strId>', methods=['PUT'])
def PutSistemaIoT(strId):
    return CallMethod.fnUpdateSistemaIoT(
        strId,
        request.get_json(silent=True) or {}
    )


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000, debug=True, threaded=True)