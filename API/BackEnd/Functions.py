from flask import jsonify
from bson import ObjectId

from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

import BackEnd.GlobalInfo.ResponseMessages as Messages
import BackEnd.GlobalInfo.Keys as ColabsKey

# Conexión e inicialización de BD y colecciones
if ColabsKey.dbconn is None:
    try:
        mongoConnect = MongoClient(ColabsKey.strConnection, serverSelectionTimeoutMS=2000)
        # Forzar una petición rápida de ping para verificar la conexión
        mongoConnect.admin.command('ping')
        ColabsKey.dbconn = mongoConnect[ColabsKey.strBDConnection]
        print("✅ ¡CONEXIÓN EXITOSA A MONGODB!")
    except Exception as err:
        print("❌ ERROR AL CONECTAR CON MONGODB:", err)

dbUsers = ColabsKey.dbconn["clUsuarios"] if ColabsKey.dbconn is not None else None
dbCultivos = ColabsKey.dbconn["clCultivos"] if ColabsKey.dbconn is not None else None
dbSistemaIoT = ColabsKey.dbconn["clSistemaIoT"] if ColabsKey.dbconn is not None else None


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


# Muestra de la adición para inicio de sesión en Functions.py
def fnGetUserByEmail(strCorreo):
    try:
        objUser = dbUsers.find_one({"strcorreoUsuario": strCorreo})
        if not objUser:
            return jsonify({"error": "Usuario no encontrado"}), 404
        
        return jsonify({
            "_id": str(objUser['_id']),
            "strnombreUsuario": objUser.get("strnombreUsuario", ""),
            "strcorreoUsuario": objUser.get("strcorreoUsuario", ""),
            "strwebsite": objUser.get("strwebsite", ""),
            "strcontrasena": objUser.get("strcontrasena", "")
        }), 200
    except Exception as e:
        print("Error en fnGetUserByEmail:", e)
        return jsonify(Messages.err500)