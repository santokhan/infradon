// src/services/database.service.ts

import PouchDB from 'pouchdb-browser'
import type { DatabaseDocument, DatabaseResponse, DatabaseError } from '../types/database.types'

class DatabaseService {
  private db: PouchDB.Database | null = null
  private readonly remoteURL: string
  private readonly localURL: string

  constructor(remoteURL: string, localURL: string = "newdb") {
    // URL passé en paramètre
    this.remoteURL = remoteURL
    this.localURL = localURL
  }

  // Initialisation de la connexion
  async initialize(): Promise<void> {
    try {
      this.db = new PouchDB(this.localURL)
      await this.db.info() // Test de connexion
    } catch (error) {
      this.handleError('Failed to initialize database', error)
    }
  }

  //fonction replicate depuis le serveur distante la base de donné from distant to local
  async replicateFromRemote() {
    console.log('Call 2')

    const db = this.db
    if (!db) {
      throw new Error('Database not initialized')
    }

    try {
      await db.replicate.from(this.remoteURL)
      console.log('Réplication terminée avec succès !')
    } catch (err) {
      console.error('Erreur lors de la réplication', err)
    }
  }

  //fonction replicate depuis le serveur distante la base de donné to distant from local
  async replicateToRemote() {
    const db = this.db
    if (!db) {
      throw new Error('Database not initialized')
    }
  
    try {
      await db.replicate.to(this.remoteURL)
      console.log('Réplication terminée avec succès vers le serveur distant !')
    } catch (err) {
      console.error('Erreur lors de la réplication vers le serveur distant', err)
    }
  }

  // Création d'un document
  async createDocument(
    document: Omit<DatabaseDocument, '_id' | '_rev'>
  ): Promise<DatabaseResponse> {
    if (!this.db) {
      throw this.handleError('Database not initialized')
    }

    try {
      const response = await this.db.post({
        ...document,
        createdAt: document.createdAt || new Date().toISOString()
      })

      return {
        ok: true,
        id: response.id,
        rev: response.rev
      }
    } catch (error) {
      throw this.handleError('Failed to create document', error)
    }
  }

  // Lecture de tous les documents
  async getAllDocuments(): Promise<DatabaseDocument[]> {
    console.log('call 3 getAllDocuments')
    if (!this.db) {
      throw this.handleError('Database not initialized')
    }

    try {
      const result = await this.db.allDocs({
        include_docs: true,
        attachments: true,
        descending: true
      })

      return result.rows.map((row) => row.doc as DatabaseDocument)
    } catch (error) {
      throw this.handleError('Failed to fetch documents', error)
    }
  }

  // Lecture d'un document par son ID
  async getDocumentById(id: string): Promise<DatabaseDocument> {
    if (!this.db) {
      throw this.handleError('Database not initialized')
    }

    try {
      const doc = await this.db.get(id)
      return doc as DatabaseDocument
    } catch (error) {
      throw this.handleError(`Failed to fetch document with id ${id}`, error)
    }
  }

  // Mise à jour d'un document
  async updateDocument(id: string, document: Partial<DatabaseDocument>): Promise<DatabaseResponse> {
    if (!this.db) {
      throw this.handleError('Database not initialized')
    }

    try {
      const existingDoc = await this.db.get(id)
      const response = await this.db.put({
        ...existingDoc,
        ...document,
        _id: id,
        _rev: existingDoc._rev
      })

      return {
        ok: true,
        id: response.id,
        rev: response.rev
      }
    } catch (error) {
      throw this.handleError(`Failed to update document with id ${id}`, error)
    }
  }

  // Suppression d'un document
  async deleteDocument(id: string): Promise<DatabaseResponse> {
    if (!this.db) {
      throw this.handleError('Database not initialized')
    }

    try {
      const doc = await this.db.get(id)
      const response = await this.db.remove(doc)

      return {
        ok: true,
        id: response.id,
        rev: response.rev
      }
    } catch (error) {
      throw this.handleError(`Failed to delete document with id ${id}`, error)
    }
  }

  // Gestion des erreurs
  private handleError(message: string, error?: any): DatabaseError {
    console.error(message, error)

    return {
      status: error?.status || 500,
      message: message,
      error: error
    }
  }

  // Fermeture de la connexion
  async close(): Promise<void> {
    if (this.db) {
      await this.db.close()
      this.db = null
    }
  }
}

export { DatabaseService }