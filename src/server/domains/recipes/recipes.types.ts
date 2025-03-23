export type Recipe = {
    id?: number;
    name?: string;
    user_id?: number;
    is_public?: boolean;
    cuisine_id?: number;
    base_serving_size?: number;
    cook_time?: number;
    oven_preheat?: number;
    rating?: number;
    active_prep_time?: number;
    wait_time?: number;
}