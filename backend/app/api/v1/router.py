"""Aggregated API v1 router."""

from fastapi import APIRouter

from app.api.v1.auth import router as auth_router
from app.api.v1.properties import router as properties_router
from app.api.v1.bookings import router as bookings_router
from app.api.v1.ai import router as ai_router

api_router = APIRouter()

api_router.include_router(auth_router)
api_router.include_router(properties_router)
api_router.include_router(bookings_router)
api_router.include_router(ai_router)
