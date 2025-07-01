import { NextResponse } from "next/server";
import { collection, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../../../../firebase.js';

export async function DELETE(req) {
  try {
    const { userId, collectionName, cardId } = await req.json();

    if (!userId || !collectionName || !cardId) {
      return NextResponse.json(
        { error: "User ID, collection name, and card ID are required" },
        { status: 400 }
      );
    }

    // Delete the specific card document
    const cardDocRef = doc(collection(doc(collection(db, 'users'), userId), collectionName), cardId);
    await deleteDoc(cardDocRef);

    return NextResponse.json(
      { message: "Flashcard deleted successfully" },
      { status: 200 }
    );

  } catch (error) {
    console.error("Error deleting flashcard:", error);
    return NextResponse.json(
      { error: "Failed to delete flashcard" },
      { status: 500 }
    );
  }
} 