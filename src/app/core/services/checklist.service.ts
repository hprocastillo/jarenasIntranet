import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/firestore";
import {Answer, Category, Checklist, Question, Verification} from "../interfaces/checklist";
import {map} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ChecklistService {
  //COLLECTIONS
  checklistsCollection: AngularFirestoreCollection<Checklist>;
  categoriesCollection: AngularFirestoreCollection<Category>;
  questionsCollection: AngularFirestoreCollection<Question>;
  answersCollection: AngularFirestoreCollection<Answer>;
  verificationsCollection: AngularFirestoreCollection<Verification>;

  constructor(private readonly afs: AngularFirestore) {
    this.checklistsCollection = afs.collection<Checklist>('checklists', ref => ref
      .orderBy('createdAt', 'desc'));
    this.categoriesCollection = afs.collection<Category>('categories', ref => ref
      .orderBy('createdAt', 'desc'));
    this.questionsCollection = afs.collection<Question>('questions', ref => ref
      .orderBy('createdAt', 'desc'));
    this.answersCollection = afs.collection<Answer>('answers', ref => ref
      .orderBy('createdAt', 'desc'));
    this.verificationsCollection = afs.collection<Verification>('verifications', ref => ref
      .orderBy('createdAt', 'desc'));
  }

  //CHECKLIST SERVICE//
  getChecklists() {
    return this.checklistsCollection.snapshotChanges().pipe(map(actions => actions.map(a => {
      const data = a.payload.doc.data() as Checklist;
      const id = a.payload.doc.id;
      return {id, ...data};
    })));
  }

  getChecklistsActiveAndPublish() {
    return this.afs.collection<Checklist>('checklists', ref => ref
      .where('active', '==', true)
      .where('publish', '==', true)
      .orderBy('createdAt', 'desc'))
      .snapshotChanges().pipe(map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Checklist;
        const id = a.payload.doc.id;
        return {id, ...data};
      })));
  }

  getChecklistsActive() {
    return this.afs.collection<Checklist>('checklists', ref => ref
      .where('active', '==', true)
      .orderBy('createdAt', 'desc'))
      .snapshotChanges().pipe(map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Checklist;
        const id = a.payload.doc.id;
        return {id, ...data};
      })));
  }

  getChecklistById(id: string) {
    return this.afs.collection<Checklist>('checklists').doc(id).valueChanges();
  }

  saveChecklist(checklist: Checklist, checklistId: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const id = checklistId || this.afs.createId();
        const data = {id, ...checklist};
        const result = await this.checklistsCollection.doc(id).set(data);
        resolve(result);
      } catch (message) {
        reject(message);
      }
    });
  }

  updateChecklist(checklist: Checklist, checklistId: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const id = checklistId;
        const data = {id, ...checklist};
        const result = await this.checklistsCollection.doc(id).update(data);
        resolve(result);
      } catch (message) {
        reject(message);
      }
    });
  }

  deleteChecklist(id: any): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await this.checklistsCollection.doc(id).delete();
        resolve(result);
      } catch (message) {
        reject(message);
      }
    });
  }

  //CATEGORY SERVICE//
  getCategories() {
    return this.categoriesCollection.snapshotChanges().pipe(map(actions => actions.map(a => {
      const data = a.payload.doc.data() as Category;
      const id = a.payload.doc.id;
      return {id, ...data};
    })));
  }

  getCategoryById(id: string) {
    return this.afs.collection<Category>('categories').doc(id).valueChanges();
  }

  saveCategory(category: Category, categoryId: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const id = categoryId || this.afs.createId();
        const data = {id, ...category};
        const result = await this.categoriesCollection.doc(id).set(data);
        resolve(result);
      } catch (message) {
        reject(message);
      }
    });
  }

  updateCategory(category: Category, categoryId: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const id = categoryId;
        const data = {id, ...category};
        const result = await this.categoriesCollection.doc(id).update(data);
        resolve(result);
      } catch (message) {
        reject(message);
      }
    });
  }

  deleteCategory(id: any): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await this.categoriesCollection.doc(id).delete();
        resolve(result);
      } catch (message) {
        reject(message);
      }
    });
  }

  //QUESTION SERVICE
  getQuestions() {
    return this.questionsCollection.snapshotChanges().pipe(map(actions => actions.map(a => {
      const data = a.payload.doc.data() as Question;
      const id = a.payload.doc.id;
      return {id, ...data};
    })));
  }

  getQuestionsByChecklist(checklistId: string) {
    return this.afs.collection<Question>('questions', ref => ref
      .where('checklistId', '==', checklistId)
      .orderBy('categoryId', 'asc'))
      .snapshotChanges().pipe(map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Question;
        const id = a.payload.doc.id;
        return {id, ...data};
      })));
  }

  getQuestionById(id: string) {
    return this.afs.collection<Question>('questions').doc(id).valueChanges();
  }

  saveQuestion(question: Question, questionId: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const id = questionId || this.afs.createId();
        const data = {id, ...question};
        const result = await this.questionsCollection.doc(id).set(data);
        resolve(result);
      } catch (message) {
        reject(message);
      }
    });
  }

  updateQuestion(question: Question, questionId: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const id = questionId;
        const data = {id, ...question};
        const result = await this.questionsCollection.doc(id).update(data);
        resolve(result);
      } catch (message) {
        reject(message);
      }
    });
  }

  deleteQuestion(id: any): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await this.questionsCollection.doc(id).delete();
        resolve(result);
      } catch (message) {
        reject(message);
      }
    });
  }

  //ANSWER SERVICE//
  getAnswers(employeeId: string, checklistId: string, categoryId: string, questionId: string) {
    return this.afs.collection<Answer>('answers', ref => ref
      .where('employeeId', '==', employeeId)
      .where('checklistId', '==', checklistId)
      .where('categoryId', '==', categoryId)
      .where('questionId', '==', questionId)
      .orderBy('createdAt', 'desc'))
      .snapshotChanges().pipe(map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Answer;
        const id = a.payload.doc.id;
        return {id, ...data};
      })));
  }

  getAnswerById(id: string) {
    return this.afs.collection<Answer>('Answers').doc(id).valueChanges();
  }

  saveAnswer(answer: Answer, answerId: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const id = answerId || this.afs.createId();
        const data = {id, ...answer};
        const result = await this.answersCollection.doc(id).set(data);
        resolve(result);
      } catch (message) {
        reject(message);
      }
    });
  }

  updateAnswer(answer: Answer, answerId: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const id = answerId;
        const data = {id, ...answer};
        const result = await this.answersCollection.doc(id).update(data);
        resolve(result);
      } catch (message) {
        reject(message);
      }
    });
  }

  deleteAnswer(id: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await this.answersCollection.doc(id).delete();
        resolve(result);
      } catch (message) {
        reject(message);
      }
    });
  }

  //VERIFICATION SERVICE//
  getVerifications() {
    return this.afs.collection<Verification>('verifications', ref => ref
      .where('active', '==', true)
      .where('finished', '==', true)
      .orderBy('createdAt', 'desc'))
      .snapshotChanges().pipe(map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Verification;
        const id = a.payload.doc.id;
        return {id, ...data};
      })));
  }

  getVerificationById(verificationId: string) {
    return this.afs.collection<Verification>('verifications').doc(verificationId).valueChanges();
  }
}
