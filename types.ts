import { IconType } from "react-icons";
import { Database, Json } from "./types_db";


export interface CommodityType {
    title: String
    id: String
}

export interface RatesType {
    id: String;
    product_id: String;
    star_number: Number;
    comment: String;
    createdAt: Date;
    user: UserType;
}

export interface AccountType {
    id: String;
    userId: String;
    type: String;
    provider: String;
    providerAccountId: String;
    refresh_token: String;
    access_token: String;
    expires_at: Number;
    token_type: String;
    scope: String;
    id_token: String;
    session_state: String;
}

export interface ReservantionType {
    id: String;
    userId: String;
    listingId: String;
    startDate: Date;
    endDate: Date;
    totalPrice: Number;
    createdAt: Date;
}

export interface ListingType {
    id: String;
    title: String;
    description: String;
    imageSrc: String;
    createdAt: Date;
    category: String;
    roomCount: Number;
    bathroomCount: Number;
    guestCount: Number;
    locationValue: String;
    userId: String;
    price: Number;
    user: UserType;
    reservation: RegionType[];
}

export interface UserType {
    id: String;
    name: String;
    email: String;
    emailVerified: Date;
    image: String;
    phone: String;
    hashedPassword: String;
    createdAt: Date;
    updatedAt: Date;
    favouriteIds: String[];
    account: AccountType;
    listings: ListingType[];
    reservation: ReservantionType[];
}

// ----------------------------- VALID TYPES
export interface CategoryType {
    label: string;
    icon: IconType;
    description: string;
    id: string;
}

export interface RegionType {
    id: number;
    nome: string;
    microrregiao: {
        id: number;
        nome: string;
        mesorregiao: {
            id: number;
            nome: string;
            UF: {
                id: number;
                nome: string;
                sigla: string;
                regiao: {
                    id: number;
                    sigla: string;
                    nome: string;
                }
            }
        }
    }
    'regiao-imediata': {
        id: number;
        nome: string;
        'regiao-intermediaria': {
            id: number;
            nome: string;
            UF: {
                id: number;
                sigla: string;
                nome: string;
                regiao: {
                    id: number;
                    sigla: string;
                    nome: string;
                }
            }
        }
    }
}

export interface CustomerType {
    created_at: string | null
    id: string
    stripe_customer_id: string | null
}

export interface LikedPropertiesType {
    created_at: string | null
    property_id: number
    user_id: string
    active: boolean
    updated_at: Json
    id: string
}

export interface PricesType {
    active: boolean | null
    currency: string | null
    description: string | null
    id: string
    interval: Database["public"]["Enums"]["pricing_plan_interval"] | null
    interval_count: number | null
    start_day: string
    end_day: string
    metadata: Json | null
    product_id: string | null
    trial_period_days: number | null
    type: Database["public"]["Enums"]["pricing_type"] | null
    unit_amount: number | null
}

export interface ProductType {
    active: boolean | null
    description: string | null
    id: string
    image: string | null
    metadata: Json | null
    name: string | null
}

export interface PropertyType {
    created_at: string
    id: string
    cover_image: string
    image_path: string[]
    title: string
    description: string
    user_id: string
    phone: string
    category: string[]
    roomcount: number
    bathroomcount: number
    guestcount: number
    locationvalue: RegionType
    price: number
    reservation: Date[]
    commodities: string[]
    current_period_end: string
    current_period_start: string
    ended_at: string | null
    renewed: boolean
}

export interface SubscriptionType {
    cancel_at: string | null
    cancel_at_period_end: boolean | null
    canceled_at: string | null
    created: string
    current_period_end: string
    current_period_start: string
    ended_at: string | null
    id: string
    metadata: Json | null
    price_id: string | null
    quantity: number | null
    status: Database["public"]["Enums"]["subscription_status"] | null
    trial_end: string | null
    trial_start: string | null
    user_id: string
    product_id: string
}

export interface UsersType {
    avatar_url: string | null
    billing_address: Json | null
    full_name: string | null
    id: string
    payment_method: Json | null
    email: string
    emailVerified: string
    phone: number
    hashedPassword: string
    created_at: string | null
    updated_at: Json | null
}

export interface CommentType {
    created_at: string
    updated_at: Date[] | null
    id: string
    user_id: string
    stars_value: number
    comment: string
    active: boolean
    property_id: string
    user: { name: any, image: any }
}

export interface MessageType {
    created_at: string | null
    id: string
    user_id: string
    host_id: string
    message: string
    readed: boolean
}
