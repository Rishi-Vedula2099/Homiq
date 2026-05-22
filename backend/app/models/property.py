"""Property model with PostGIS geography support."""

import uuid
from datetime import datetime, timezone
from enum import Enum as PyEnum

from sqlalchemy import String, Text, Numeric, Integer, DateTime, Enum, JSON, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship
from geoalchemy2 import Geography

from app.db.base import Base


class ListingType(str, PyEnum):
    SALE = "sale"
    RENT = "rent"


class PropertyStatus(str, PyEnum):
    ACTIVE = "active"
    SOLD = "sold"
    RENTED = "rented"
    INACTIVE = "inactive"


class Property(Base):
    __tablename__ = "properties"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )
    agent_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False
    )
    title: Mapped[str] = mapped_column(String(500), nullable=False)
    description: Mapped[str | None] = mapped_column(Text, nullable=True)
    listing_type: Mapped[str] = mapped_column(
        Enum(ListingType, name="listing_type", create_type=True), nullable=False
    )
    price: Mapped[float] = mapped_column(Numeric(15, 2), nullable=False)
    area_sqft: Mapped[float] = mapped_column(Numeric(10, 2), nullable=False)
    bedrooms: Mapped[int] = mapped_column(Integer, default=1)
    bathrooms: Mapped[int] = mapped_column(Integer, default=1)
    floors: Mapped[int] = mapped_column(Integer, default=1)
    address: Mapped[str] = mapped_column(String(500), nullable=False)
    city: Mapped[str] = mapped_column(String(100), nullable=False, index=True)
    state: Mapped[str] = mapped_column(String(100), nullable=False)
    zip_code: Mapped[str] = mapped_column(String(20), nullable=False)

    # PostGIS geography column for spatial queries
    location = mapped_column(
        Geography(geometry_type="POINT", srid=4326),
        nullable=True,
    )

    amenities: Mapped[dict | None] = mapped_column(JSON, nullable=True)
    images: Mapped[list | None] = mapped_column(JSON, nullable=True, default=list)
    model_3d_url: Mapped[str | None] = mapped_column(String(500), nullable=True)

    status: Mapped[str] = mapped_column(
        Enum(PropertyStatus, name="property_status", create_type=True),
        default=PropertyStatus.ACTIVE,
        nullable=False,
    )
    listed_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=lambda: datetime.now(timezone.utc)
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        onupdate=lambda: datetime.now(timezone.utc),
    )

    # Relationships
    agent: Mapped["User"] = relationship(back_populates="properties")
    bookings: Mapped[list["Booking"]] = relationship(back_populates="property", lazy="selectin")
    reviews: Mapped[list["Review"]] = relationship(back_populates="property", lazy="selectin")
