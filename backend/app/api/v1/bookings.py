"""Bookings API routes."""

import uuid
from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.session import get_db
from app.core.deps import get_current_user
from app.models.user import User
from app.schemas.booking import BookingCreate, BookingUpdate, BookingResponse
from app.services.booking_service import (
    create_booking,
    get_user_bookings,
    update_booking_status,
)

router = APIRouter(prefix="/bookings", tags=["Bookings"])


@router.get("", response_model=list[BookingResponse])
async def get_bookings(
    db: Annotated[AsyncSession, Depends(get_db)],
    current_user: Annotated[User, Depends(get_current_user)],
):
    """Get bookings for the current user."""
    bookings = await get_user_bookings(db, current_user.id, current_user.role)
    return bookings


@router.post("", response_model=BookingResponse, status_code=status.HTTP_201_CREATED)
async def schedule_booking(
    data: BookingCreate,
    db: Annotated[AsyncSession, Depends(get_db)],
    current_user: Annotated[User, Depends(get_current_user)],
):
    """Schedule a property visit."""
    try:
        booking = await create_booking(db, current_user.id, data)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    return booking


@router.patch("/{booking_id}", response_model=BookingResponse)
async def update_booking(
    booking_id: uuid.UUID,
    data: BookingUpdate,
    db: Annotated[AsyncSession, Depends(get_db)],
    current_user: Annotated[User, Depends(get_current_user)],
):
    """Update booking status."""
    try:
        booking = await update_booking_status(db, booking_id, current_user.id, data)
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except PermissionError as e:
        raise HTTPException(status_code=403, detail=str(e))
    return booking
