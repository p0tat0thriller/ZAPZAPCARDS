import { NextResponse } from "next/server";
import { collection, doc, getDoc, updateDoc, deleteDoc, getDocs } from 'firebase/firestore';
import { db } from '../../../../firebase.js';

export async function DELETE(req) {
  try {
    const { userId, collectionName } = await req.json();

    if (!userId || !collectionName) {
      return NextResponse.json(
        { error: "User ID and collection name are required" },
        { status: 400 }
      );
    }

    // Get user document reference
    const userDocRef = doc(collection(db, 'users'), userId);
    const userDocSnap = await getDoc(userDocRef);

    if (!userDocSnap.exists()) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Get the flashcards array from user document
    const userData = userDocSnap.data();
    const flashcards = userData.flashcards || [];

    // Check if the collection exists
    const collectionExists = flashcards.find(f => f.name === collectionName);
    if (!collectionExists) {
      return NextResponse.json(
        { error: "Flashcard collection not found" },
        { status: 404 }
      );
    }

    // Delete all documents in the subcollection
    const subcollectionRef = collection(userDocRef, collectionName);
    const subcollectionDocs = await getDocs(subcollectionRef);
    
    const deletePromises = subcollectionDocs.docs.map(doc => deleteDoc(doc.ref));
    await Promise.all(deletePromises);

    // Remove the collection name from the flashcards array
    const updatedFlashcards = flashcards.filter(f => f.name !== collectionName);
    await updateDoc(userDocRef, { flashcards: updatedFlashcards });

    return NextResponse.json(
      { message: "Flashcard collection deleted successfully" },
      { status: 200 }
    );

  } catch (error) {
    console.error("Error deleting flashcard collection:", error);
    return NextResponse.json(
      { error: "Failed to delete flashcard collection" },
      { status: 500 }
    );
  }
} 