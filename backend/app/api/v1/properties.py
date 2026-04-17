"""Property API routes."""

import uuid
from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.session import get_db
from app.core.deps import get_current_user, get_current_agent
from app.models.user import User
from app.schemas.property import (
    PropertyCreate,
    PropertyUpdate,
    PropertyResponse,
    PropertyListResponse,
    PropertyFilter,
    GeoSearchRequest,
)
from app.services.property_service import (
    create_property,
    get_property_by_id,
    list_properties,
    geo_search_properties,
    update_property,
    delete_property,
)

router = APIRouter(prefix="/properties", tags=["Properties"])


@router.get("", response_model=PropertyListResponse)
async def get_properties(
    db: Annotated[AsyncSession, Depends(get_db)],
    listing_type: str | None = None,
    min_price: float | None = None,
    max_price: float | None = None,
    min_area: float | None = None,
    max_area: float | None = None,
    bedrooms: int | None = None,
    bathrooms: int | None = None,
    city: str | None = None,
    state: str | None = None,
    sort_by: str | None = "listed_at",
    sort_order: str | None = "desc",
    page: int = 1,
    page_size: int = 12,
):
    """List properties with filters and pagination."""
    filters = PropertyFilter(
        listing_type=listing_type,
        min_price=min_price,
        max_price=max_price,
        min_area=min_area,
        max_area=max_area,
        bedrooms=bedrooms,
        bathrooms=bathrooms,
        city=city,
        state=state,
        sort_by=sort_by,
        sort_order=sort_order,
        page=page,
        page_size=page_size,
    )
    return await list_properties(db, filters)


@router.get("/{property_id}", response_model=PropertyResponse)
async def get_property(
    property_id: uuid.UUID,
    db: Annotated[AsyncSession, Depends(get_db)],
):
    """Get a single property by ID."""
    prop = await get_property_by_id(db, property_id)
    if not prop:
        raise HTTPException(status_code=404, detail="Property not found")
    return prop


@router.post("", response_model=PropertyResponse, status_code=status.HTTP_201_CREATED)
async def create_new_property(
    data: PropertyCreate,
    db: Annotated[AsyncSession, Depends(get_db)],
    current_user: Annotated[User, Depends(get_current_agent)],
):
    """Create a new property listing (agents only)."""
    prop = await create_property(db, current_user.id, data)
    return prop


@router.put("/{property_id}", response_model=PropertyResponse)
async def update_existing_property(
    property_id: uuid.UUID,
    data: PropertyUpdate,
    db: Annotated[AsyncSession, Depends(get_db)],
    current_user: Annotated[User, Depends(get_current_agent)],
):
    """Update a property listing (owner agent only)."""
    prop = await get_property_by_id(db, property_id)
    if not prop:
        raise HTTPException(status_code=404, detail="Property not found")
    if prop.agent_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized")

    updated = await update_property(db, prop, data)
    return updated


@router.delete("/{property_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_existing_property(
    property_id: uuid.UUID,
    db: Annotated[AsyncSession, Depends(get_db)],
    current_user: Annotated[User, Depends(get_current_agent)],
):
    """Delete a property listing (owner agent only)."""
    prop = await get_property_by_id(db, property_id)
    if not prop:
        raise HTTPException(status_code=404, detail="Property not found")
    if prop.agent_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized")

    await delete_property(db, prop)


@router.post("/search/geo", response_model=list[PropertyResponse])
async def search_properties_geo(
    data: GeoSearchRequest,
    db: Annotated[AsyncSession, Depends(get_db)],
):
    """Search properties within a geographic radius."""
    return await geo_search_properties(db, data)
