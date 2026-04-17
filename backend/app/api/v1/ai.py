"""AI API routes (mock responses for Phase 1)."""

from typing import Annotated

from fastapi import APIRouter, Depends
from pydantic import BaseModel

from app.core.deps import get_current_user
from app.models.user import User

router = APIRouter(prefix="/ai", tags=["AI"])


class PricePredictRequest(BaseModel):
    city: str
    area_sqft: float
    bedrooms: int
    bathrooms: int
    floors: int
    amenities: list[str] | None = None


class PricePredictResponse(BaseModel):
    predicted_price: float
    confidence: float
    price_range: dict


class ROIEstimateRequest(BaseModel):
    purchase_price: float
    city: str
    area_sqft: float
    listing_type: str


class ROIEstimateResponse(BaseModel):
    estimated_annual_roi: float
    rental_yield: float
    appreciation_rate: float
    payback_period_years: float


class ChatRequest(BaseModel):
    message: str
    property_id: str | None = None


class ChatResponse(BaseModel):
    response: str
    sources: list[str] | None = None


@router.post("/price-predict", response_model=PricePredictResponse)
async def predict_price(data: PricePredictRequest):
    """Predict property price (mock for Phase 1)."""
    # Mock price prediction based on simple heuristics
    base_price = {
        "mumbai": 15000, "bangalore": 8000, "delhi": 12000,
        "hyderabad": 6000, "pune": 7000, "chennai": 7500,
        "kolkata": 5000, "ahmedabad": 4500,
    }
    price_per_sqft = base_price.get(data.city.lower(), 6000)
    predicted = price_per_sqft * data.area_sqft
    predicted += data.bedrooms * 500000
    predicted += data.bathrooms * 200000
    predicted += data.floors * 300000

    return PricePredictResponse(
        predicted_price=round(predicted, 2),
        confidence=0.82,
        price_range={
            "low": round(predicted * 0.85, 2),
            "high": round(predicted * 1.15, 2),
        },
    )


@router.post("/roi-estimate", response_model=ROIEstimateResponse)
async def estimate_roi(data: ROIEstimateRequest):
    """Estimate ROI for a property (mock for Phase 1)."""
    city_yields = {
        "mumbai": 0.035, "bangalore": 0.04, "delhi": 0.032,
        "hyderabad": 0.045, "pune": 0.042, "chennai": 0.038,
        "kolkata": 0.05, "ahmedabad": 0.048,
    }
    rental_yield = city_yields.get(data.city.lower(), 0.04)
    appreciation = 0.06  # 6% annual appreciation (mock)

    return ROIEstimateResponse(
        estimated_annual_roi=round((rental_yield + appreciation) * 100, 2),
        rental_yield=round(rental_yield * 100, 2),
        appreciation_rate=round(appreciation * 100, 2),
        payback_period_years=round(1 / (rental_yield + appreciation), 1),
    )


@router.post("/chat", response_model=ChatResponse)
async def ai_chat(
    data: ChatRequest,
    current_user: Annotated[User, Depends(get_current_user)],
):
    """AI chatbot (mock for Phase 1, will integrate Ollama + FAISS in Phase 2)."""
    # Mock responses based on keywords
    message_lower = data.message.lower()

    if "safe" in message_lower or "safety" in message_lower:
        response = "Based on available data, this locality has a good safety rating. Crime rates are below the city average, with well-lit streets and active community watch programs."
    elif "price" in message_lower or "worth" in message_lower:
        response = "Property values in this area have appreciated by approximately 8% annually over the last 3 years. Current market trends suggest continued growth due to upcoming metro connectivity."
    elif "school" in message_lower or "education" in message_lower:
        response = "There are several reputed schools within a 2km radius, including international and CBSE board schools. The nearest university is 5km away."
    elif "hospital" in message_lower or "medical" in message_lower:
        response = "The area has excellent healthcare access with 3 multi-specialty hospitals within 3km and multiple clinics nearby."
    else:
        response = "I'd be happy to help you with information about this property or locality. You can ask me about safety, pricing trends, nearby schools, hospitals, connectivity, or any other aspect."

    return ChatResponse(
        response=response,
        sources=["Local property database", "Historical pricing data"],
    )
