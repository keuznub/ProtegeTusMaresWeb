// src/services/FirestoreService.ts
import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    query,
    updateDoc,
    doc,
    Timestamp,
    getDoc,
    where,
} from "firebase/firestore";
import firebaseApp from "../configs/firebaseInit";
import type { IReport } from "../types/Report";




export class FirestoreService {

    private static get db() {
        return getFirestore(firebaseApp);
    }

    /** Inserta un nuevo reporte */
    static async insertIntoDB(report: Partial<IReport>): Promise<void> {
        try {
            const colRef = collection(this.db, "Reports");
            await addDoc(colRef, {
                ...report,
                notification: "Reporte creado",
                createdAt: Timestamp.fromDate(new Date()),
                updatedAt: Timestamp.fromDate(new Date()),
                state: "pendiente",
            });
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    /** Obtiene todos los reportes */
    static async getReports(): Promise<IReport[]> {
        try {
            const colRef = collection(this.db, "Reports");
            const q = query(colRef);
            const snap = await getDocs(q);

            return snap.docs.map((d) => {
                const data = d.data();
                return {
                    id: d.id,
                    type: data.type,
                    geoLocation: data.geoLocation,
                    createdAt:
                        data.createdAt instanceof Timestamp
                            ? data.createdAt.toDate()
                            : new Date(),
                    updatedAt:
                        data.updatedAt instanceof Timestamp
                            ? data.updatedAt.toDate()
                            : new Date(),
                    title: data.title,
                    address: data.address ?? "",
                    description: data.description,
                    imageUrl: data.imageUrl,
                    state: data.state,
                    userId: data.userId ?? "",
                    notification: data.notification ?? "",
                } as IReport;
            });
        } catch (e) {
            console.error("Error getting documents: ", e);
            return [];
        }
    }


    static async getReportById(reportId: string): Promise<IReport | null> {
        try {
            const docRef = doc(this.db, "Reports", reportId);
            const report = (await getDoc(docRef)).data() as IReport;
            if (!report) return null
            return report
        } catch (e) {
            console.error("Error getting documents: ", e);
            return null;
        }
    }

    /** Borra la notificación de un reporte */
    static async deleteNotificationById(reportId: string): Promise<void> {
        try {
            const docRef = doc(this.db, "Reports", reportId);
            await updateDoc(docRef, { notification: "" });
        } catch (e) {
            console.error("Error updating document: ", e);
        }
    }

    static async getRoleByUid(uid: string): Promise<string | undefined> {
        try {
            const usersRef = collection(this.db, "Users");
            const queryref = query(usersRef, where("uid", "==", uid))
            const result = await getDocs(queryref)
            if (result.empty) return
            console.log("result", result.docs[0].data());
            return result.docs[0].data().role;

        } catch (e) {
            console.error("Error getting role: ", e);
        }
    }

    static async updateReportState(reportId: string, state: string): Promise<void> {
        try {
            console.log("value", reportId);
            const docRef = doc(this.db, "Reports", reportId)
            console.log("docRef");

            await updateDoc(docRef, { state, notification: "Reporte " + state, updatedAt: new Date() })
            console.log("Updated");

        } catch (e) {
            console.error("Error updaing state: ", e);
        }
    }
}
