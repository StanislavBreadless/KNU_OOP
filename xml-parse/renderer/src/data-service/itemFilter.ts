import { PersonData, DataSearchFilters } from '../types';

interface ItemPredicate {
  (item: PersonData): boolean;
}

export class ItemFilter {

  private filters: ItemPredicate[];
  
  filter(item: PersonData) {
    return this.filters.every(p => p(item));
  }

  constructor() {
    this.filters = [];
  }

  minAge(minAge?: number) {
    if(!minAge) {
      return this;
    }

    this.filters.push((item) => item.age >= minAge)

    return this;
  }

  maxAge(maxAge?: number) {
    if(!maxAge) {
      return this;
    }

    this.filters.push((item) => item.age <= maxAge);
    return this;
  }

  minWorth(minWorth?: number) {
    if(!minWorth) {
      return this;
    }

    this.filters.push((item) => item.worth >= minWorth)

    return this;
  }

  maxWorth(maxWorth?: number) {
    if(!maxWorth) {
      return this;
    }

    this.filters.push((item) => item.worth <= maxWorth);
    return this;
  }

  name(name?: string) {
    if(!name) {
      return this;
    }

    this.filters.push((item) => item.name === name)

    return this;
  }

  industry(industry?: string) {
    if(!industry) {
      return this;
    }

    this.filters.push((item) => item.industry === industry)

    return this;
  }

  source(source?: string) {
    if(!source) {
      return this;
    }

    this.filters.push((item) => item.source === source)

    return this;
  }

  country(country?: string) {
    if(!country) {
      return this;
    }

    this.filters.push((item) => item.country === country)

    return this;
  }

  static fromFiltersObject(filters: DataSearchFilters): ItemFilter {
    const itemFilter = new ItemFilter()
      .name(filters.name)
      .maxAge(filters.maxAge)
      .minAge(filters.minAge)
      .industry(filters.industry)
      .source(filters.source)
      .country(filters.country)
      .minWorth(filters.minWorth)
      .maxWorth(filters.maxWorth);

    return itemFilter;
  }
}