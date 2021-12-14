import firebase from "firebase";
import Timestamp = firebase.firestore.Timestamp;

export interface Request {
  id?: string;
  message: string;
  userDisplayName: string;
  userEmail: string;
  active: boolean;
  status: string;

  requestType: string;

  createdBy: string;
  createdAt: Timestamp;
  updatedBy: string;
  updatedAt: Timestamp;
}
