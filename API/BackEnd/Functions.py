from flask import jsonify
from bson import ObjectId

from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

import BackEnd.GlobalInfo.ResponseMessages as Messages
import BackEnd.GlobalInfo.Keys as ColabsKey

# Conexión e inicialización de BD y colecciones
if ColabsKey.dbconn is None:
    mongoConnect = MongoClient(ColabsKey.strConnection)
    ColabsKey.dbconn = mongoConnect[ColabsKey.strBDConnection]

dbUsers = ColabsKey.dbconn["clUsuarios"]
dbCultivos = ColabsKey.dbconn["clCultivos"]
dbSistemaIoT = ColabsKey.dbconn["clSistemaIoT"]


# 1. PERFIL DE USUARIO

def fnGetUsers():
    try:
        arrFinalUsers = []
        listUsers = list(dbUsers.find({}))
        
        for objUser in listUsers:
            arrFinalUsers.append({
                "_id": str(objUser['_id']),
                "strnombreUsuario": objUser.get("strnombreUsuario", ""),
                "strcorreoUsuario": objUser.get("strcorreoUsuario", ""),
                "strwebsite": objUser.get("strwebsite", ""),
                "strcontrasena": objUser.get("strcontrasena", "")
            })
            
        objResponse = Messages.succ200.copy()
        objResponse['Respuesta'] = arrFinalUsers
        return jsonify(objResponse)
    except Exception as e:
        print("Error en fnGetUsers:", e)
        return jsonify(Messages.err500)

def fnInsertUser(objUser):
    try:
        resultado = dbUsers.insert_one(objUser)
        return jsonify({"_id": str(resultado.inserted_id)}), 201
    except Exception as e:
        print("Error en fnInsertUser:", e)
        return jsonify(Messages.err500)

def fnUpdateUser(strId, objCambios):
    if not ObjectId.is_valid(strId):
        return jsonify({"error": "ID Inválido"}), 400

    camposPermitidos = {"strnombreUsuario", "strcorreoUsuario", "strwebsite", "strcontrasena"}
    cambios = {k: v for k, v in objCambios.items() if k in camposPermitidos}

    if not cambios:
        return jsonify({"error": "No hay campos válidos para actualizar"}), 400

    resultado = dbUsers.update_one(
        {"_id": ObjectId(strId)},
        {"$set": cambios}
    )

    if resultado.matched_count == 0:
        return jsonify({"error": "Usuario no encontrado"}), 404

    return jsonify({"actualizados": resultado.modified_count}), 200

def fnDeleteUser(strId):
    if not ObjectId.is_valid(strId):
        return jsonify({"error": "ID Inválido"}), 400

    resultado = dbUsers.delete_one({"_id": ObjectId(strId)})

    if resultado.deleted_count == 0:
        return jsonify({"error": "Usuario no encontrado"}), 404

    return jsonify({"eliminados": resultado.deleted_count}), 200


# 2. CULTIVO

def fnGetCultivos():
    try:
        arrFinalCultivos = []
        listCultivos = list(dbCultivos.find({}))

        for objCultivo in listCultivos:
            arrFinalCultivos.append({
                "_id": str(objCultivo['_id']),
                "strnombrePlanta": objCultivo.get("strnombrePlanta", ""),
                "strestadoPlanta": objCultivo.get("strestadoPlanta", ""),
                "intfilas": int(objCultivo.get("intfilas", 0)),
                "intcolumnas": int(objCultivo.get("intcolumnas", 0)),
                "intnivelHumedad": int(objCultivo.get("intnivelHumedad", 0)),
                "floattemperatura": float(objCultivo.get("floattemperatura", 0.0))
            })

        objResponse = Messages.succ200.copy()
        objResponse['Respuesta'] = arrFinalCultivos
        return jsonify(objResponse)
    except Exception as e:
        print("Error en fnGetCultivos:", e)
        return jsonify(Messages.err500)

def fnInsertCultivo(objCultivo):
    try:
        resultado = dbCultivos.insert_one(objCultivo)
        return jsonify({"_id": str(resultado.inserted_id)}), 201
    except Exception as e:
        print("Error en fnInsertCultivo:", e)
        return jsonify(Messages.err500)

def fnUpdateCultivo(strId, objCambios):
    if not ObjectId.is_valid(strId):
        return jsonify({"error": "ID Inválido"}), 400

    camposPermitidos = {
        "strnombrePlanta", "strestadoPlanta", "intfilas", 
        "intcolumnas", "intnivelHumedad", "floattemperatura"
    }
    cambios = {k: v for k, v in objCambios.items() if k in camposPermitidos}

    if not cambios:
        return jsonify({"error": "No hay campos válidos para actualizar"}), 400

    resultado = dbCultivos.update_one(
        {"_id": ObjectId(strId)},
        {"$set": cambios}
    )

    if resultado.matched_count == 0:
        return jsonify({"error": "Cultivo no encontrado"}), 404

    return jsonify({"actualizados": resultado.modified_count}), 200

def fnDeleteCultivo(strId):
    if not ObjectId.is_valid(strId):
        return jsonify({"error": "ID Inválido"}), 400

    resultado = dbCultivos.delete_one({"_id": ObjectId(strId)})

    if resultado.deleted_count == 0:
        return jsonify({"error": "Cultivo no encontrado"}), 404

    return jsonify({"eliminados": resultado.deleted_count}), 200


# 3. ESTADO DEL SISTEMA IOT

def fnGetSistemaIoT():
    try:
        arrFinalIoT = []
        listIoT = list(dbSistemaIoT.find({}))

        for objIoT in listIoT:
            arrFinalIoT.append({
                "_id": str(objIoT['_id']),
                "estado": objIoT.get("estado", ""),
                "loraConnected": bool(objIoT.get("loraConnected", False)),
                "connectedDevicesCount": int(objIoT.get("connectedDevicesCount", 0)),
                "isPumpActive": bool(objIoT.get("isPumpActive", False))
            })

        objResponse = Messages.succ200.copy()
        objResponse['Respuesta'] = arrFinalIoT
        return jsonify(objResponse)
    except Exception as e:
        print("Error en fnGetSistemaIoT:", e)
        return jsonify(Messages.err500)

def fnInsertSistemaIoT(objIoT):
    try:
        resultado = dbSistemaIoT.insert_one(objIoT)
        return jsonify({"_id": str(resultado.inserted_id)}), 201
    except Exception as e:
        print("Error en fnInsertSistemaIoT:", e)
        return jsonify(Messages.err500)

def fnUpdateSistemaIoT(strId, objCambios):
    if not ObjectId.is_valid(strId):
        return jsonify({"error": "ID Inválido"}), 400

    camposPermitidos = {"estado", "loraConnected", "connectedDevicesCount", "isPumpActive"}
    cambios = {k: v for k, v in objCambios.items() if k in camposPermitidos}

    if not cambios:
        return jsonify({"error": "No hay campos válidos para actualizar"})