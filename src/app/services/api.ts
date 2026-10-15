import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    // Cambia 'localhost' por tu IP local si vas a probar en un celular físico (ej. 'http://192.168.1.50:5000')
    private apiUrl = 'http://192.168.100.14:5000';

    constructor(private http: HttpClient) {}

    // --- USUARIOS ---
    getUsers(): Observable<any> {
        return this.http.get(`${this.apiUrl}/getUsers`);
    }

    insertUser(user: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/users`, user);
    }

    updateUser(id: string, user: any): Observable<any> {
        return this.http.put(`${this.apiUrl}/users/${id}`, user);
    }

    deleteUser(id: string): Observable<any> {
        return this.http.delete(`${this.apiUrl}/users/${id}`);
    }

    // --- CULTIVOS ---
    getCultivos(): Observable<any> {
        return this.http.get(`${this.apiUrl}/getCultivos`);
    }

    insertCultivo(cultivo: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/cultivos`, cultivo);
    }

    updateCultivo(id: string, cultivo: any): Observable<any> {
        return this.http.put(`${this.apiUrl}/cultivos/${id}`, cultivo);
    }

    deleteCultivo(id: string): Observable<any> {
        return this.http.delete(`${this.apiUrl}/cultivos/${id}`);
    }

    // --- SISTEMA IOT ---
    getSistemaIoT(): Observable<any> {
        return this.http.get(`${this.apiUrl}/getSistemaIoT`);
    }

    insertSistemaIoT(iotData: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/sistemaiot`, iotData);
    }

    updateSistemaIoT(id: string, iotData: any): Observable<any> {
        return this.http.put(`${this.apiUrl}/sistemaiot/${id}`, iotData);
    }
}