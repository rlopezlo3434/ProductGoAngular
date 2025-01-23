// src/app/models/search-params.model.ts

export class SearchParams {
    typeSearch: string;
    description?: string;
    mod?: string;
    type?: string;
    category?: string;
    family?: string;
    subfamily?: string;
    state?: string;
    advance?: string;
    orderDate?: string;
    user: string;
    colorState?: string;
  
    constructor(
      typeSearch: string,
      user: string,
      description?: string,
      mod?: string,
      type?: string,
      category?: string,
      family?: string,
      subfamily?: string,
      state?: string,
      advance?: string,
      orderDate?: string,
      colorState?: string
    ) {
      this.typeSearch = typeSearch;
      this.user = user;
      this.description = description;
      this.mod = mod;
      this.type = type;
      this.category = category;
      this.family = family;
      this.subfamily = subfamily;
      this.state = state;
      this.advance = advance;
      this.orderDate = orderDate;
      this.colorState = colorState;
    }
  }
  