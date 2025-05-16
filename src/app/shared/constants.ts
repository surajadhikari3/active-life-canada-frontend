const BASE_URL = 'api/v1';

export const API_ENDPOINTS = {
  AUTHENTICATION_BASE_URL: `${BASE_URL}/authentication`,
  OFFERED_COURSE: `${BASE_URL}/offeredCourses`,
  CART: `${BASE_URL}/cart`,
}

export enum Status {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  PENDING = 'PENDING'
}
