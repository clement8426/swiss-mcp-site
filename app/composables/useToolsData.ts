export interface Tool {
  name: string
  description: string
  params: string[]
  requiresAuth: boolean
  authKey?: string
}

/** Tool as returned by `allTools` — includes parent category for filtering. */
export interface ToolWithCategory extends Tool {
  categoryId: string
}

export interface Category {
  id: string
  label: string
  abbr: string
  color: string
  bgColor: string
  description: string
  tools: Tool[]
}

export const useToolsData = () => {
  const categories: Category[] = [
    {
      id: 'setup',
      label: 'Setup',
      abbr: 'SU',
      color: '#94A3B8',
      bgColor: 'rgba(148, 163, 184, 0.1)',
      description: 'Check configuration status and store optional API keys — no server restart needed.',
      tools: [
        {
          name: 'swiss_check_setup',
          description: 'Check which optional API keys are configured. Call this first to know which tools are fully operational and which need a free API key.',
          params: [],
          requiresAuth: false,
        },
        {
          name: 'swiss_set_api_key',
          description: 'Store an optional API key so tools that require it become fully operational. Keys are saved in ~/.swiss-apis-mcp/keys and take effect immediately.',
          params: ['key_name', 'value'],
          requiresAuth: false,
        },
      ],
    },
    {
      id: 'transport',
      label: 'Transport',
      abbr: 'TR',
      color: '#60A5FA',
      bgColor: 'rgba(96, 165, 250, 0.1)',
      description: 'Real-time departures, connections, station search and GTFS data across Switzerland.',
      tools: [
        {
          name: 'swiss_transport_stationboard',
          description: 'Get next departures from any Swiss public transport station in real time.',
          params: ['station', 'limit', 'transportations'],
          requiresAuth: false,
        },
        {
          name: 'swiss_transport_connections',
          description: 'Find train, bus, tram or boat connections between two Swiss locations.',
          params: ['from', 'to', 'via', 'datetime', 'limit'],
          requiresAuth: false,
        },
        {
          name: 'swiss_transport_station_search',
          description: 'Search for Swiss public transport stations by name or geographic coordinates.',
          params: ['query', 'lat', 'lon', 'limit'],
          requiresAuth: false,
        },
        {
          name: 'swiss_transport_gtfs_realtime',
          description: 'Get real-time GTFS data (trip updates, vehicle positions, service alerts) from opentransportdata.swiss.',
          params: ['feed_type'],
          requiresAuth: true,
          authKey: 'OTD_API_KEY',
        },
      ],
    },
    {
      id: 'geo',
      label: 'Geography',
      abbr: 'GEO',
      color: '#34D399',
      bgColor: 'rgba(52, 211, 153, 0.1)',
      description: 'Elevation, canton/municipality identification, coordinate conversion and official swisstopo map layers.',
      tools: [
        {
          name: 'swiss_geo_search_location',
          description: 'Search for any Swiss location — cities, addresses, communes, postal codes or points of interest.',
          params: ['query', 'types', 'limit', 'sr'],
          requiresAuth: false,
        },
        {
          name: 'swiss_geo_get_elevation',
          description: 'Get the exact elevation (altitude in meters) for any WGS84 coordinates in Switzerland via swisstopo.',
          params: ['lat', 'lng'],
          requiresAuth: false,
        },
        {
          name: 'swiss_geo_identify_canton',
          description: 'Identify which Swiss canton a given WGS84 coordinate belongs to.',
          params: ['lat', 'lng'],
          requiresAuth: false,
        },
        {
          name: 'swiss_geo_identify_municipality',
          description: 'Identify which Swiss municipality (commune) a given WGS84 coordinate belongs to.',
          params: ['lat', 'lng'],
          requiresAuth: false,
        },
        {
          name: 'swiss_geo_convert_coordinates',
          description: 'Convert coordinates between Swiss LV95 (CH1903+), LV03 (CH1903) and WGS84 via official swisstopo REFRAME service.',
          params: ['from_system', 'to_system', 'coord1', 'coord2'],
          requiresAuth: false,
        },
        {
          name: 'swiss_geo_get_wmts_tile_url',
          description: 'Generate a swisstopo WMTS tile URL for map display using the official Swiss national map.',
          params: ['layer', 'z', 'x', 'y'],
          requiresAuth: false,
        },
        {
          name: 'swiss_geo_find_layer_features',
          description: 'Search features in a swisstopo map layer by text (streets, buildings, stations, etc.).',
          params: ['layer', 'search_text', 'search_field', 'limit'],
          requiresAuth: false,
        },
      ],
    },
    {
      id: 'health',
      label: 'Health',
      abbr: 'HE',
      color: '#F87171',
      bgColor: 'rgba(248, 113, 113, 0.1)',
      description: 'Federal Office of Public Health (BAG) datasets and 100+ health indicators by canton.',
      tools: [
        {
          name: 'swiss_health_search_datasets',
          description: 'Search BAG (Federal Office of Public Health) datasets on opendata.swiss.',
          params: ['query', 'rows'],
          requiresAuth: false,
        },
        {
          name: 'swiss_health_get_dataset',
          description: 'Get direct download URLs and metadata for a specific BAG health dataset by its slug.',
          params: ['dataset_slug'],
          requiresAuth: false,
        },
        {
          name: 'swiss_health_get_versorgungsatlas',
          description: 'Get Swiss Health Atlas (Versorgungsatlas) data — 100+ health indicators broken down by canton.',
          params: ['indicator'],
          requiresAuth: false,
        },
      ],
    },
    {
      id: 'politics',
      label: 'Politics',
      abbr: 'PO',
      color: '#C084FC',
      bgColor: 'rgba(192, 132, 252, 0.1)',
      description: 'Parliamentary motions, federal legislation via Fedlex and councillors across 74+ parliaments.',
      tools: [
        {
          name: 'swiss_parliament_search',
          description: 'Search Swiss parliamentary business (motions, postulates, votes) across 74+ cantonal and national parliaments.',
          params: ['query', 'parliament', 'limit'],
          requiresAuth: false,
        },
        {
          name: 'swiss_parliament_persons',
          description: 'Get Swiss parliament members (national councillors, state councillors, cantonal deputies) with their activity.',
          params: ['parliament', 'limit'],
          requiresAuth: false,
        },
        {
          name: 'swiss_federal_law_search',
          description: 'Search Swiss federal legislation via Fedlex (official federal law publication platform) using SPARQL.',
          params: ['query'],
          requiresAuth: false,
        },
      ],
    },
    {
      id: 'business',
      label: 'Business',
      abbr: 'BIZ',
      color: '#FBBF24',
      bgColor: 'rgba(251, 191, 36, 0.1)',
      description: 'Company registry (ZEFIX), Official Gazette (SOGC) and 14,000+ open government datasets.',
      tools: [
        {
          name: 'swiss_company_search',
          description: 'Search Swiss companies in ZEFIX (central business name index). Filter by canton and active status.',
          params: ['name', 'canton', 'active_only', 'max_results'],
          requiresAuth: true,
          authKey: 'ZEFIX_USER + ZEFIX_PASS',
        },
        {
          name: 'swiss_company_by_uid',
          description: 'Get full details of a Swiss company by its UID from the official ZEFIX registry.',
          params: ['uid'],
          requiresAuth: true,
          authKey: 'ZEFIX_USER + ZEFIX_PASS',
        },
        {
          name: 'swiss_company_publications',
          description: 'Get Swiss Official Gazette (SOGC) publications for a company by its UID.',
          params: ['uid'],
          requiresAuth: true,
          authKey: 'ZEFIX_USER + ZEFIX_PASS',
        },
        {
          name: 'swiss_opendata_search_datasets',
          description: 'Search the opendata.swiss catalog — 14,000+ official Swiss government datasets. No authentication required.',
          params: ['query', 'organization', 'format', 'rows'],
          requiresAuth: false,
        },
      ],
    },
    {
      id: 'energy',
      label: 'Energy',
      abbr: 'EN',
      color: '#FDE047',
      bgColor: 'rgba(253, 224, 71, 0.08)',
      description: 'Swiss Federal Office of Energy (SFOE) datasets and Swissgrid electricity grid data.',
      tools: [
        {
          name: 'swiss_energy_search_datasets',
          description: 'Search Swiss energy datasets from SFOE (Swiss Federal Office of Energy) on opendata.swiss.',
          params: ['query', 'rows'],
          requiresAuth: false,
        },
        {
          name: 'swiss_grid_energy_data',
          description: 'Get Swiss electricity grid data from Swissgrid (production, consumption, cross-border flows).',
          params: ['query'],
          requiresAuth: false,
        },
      ],
    },
    {
      id: 'weather',
      label: 'Weather',
      abbr: 'WX',
      color: '#22D3EE',
      bgColor: 'rgba(34, 211, 238, 0.1)',
      description: 'MeteoSwiss open datasets, SLF avalanche warnings and BAFU hydrological data.',
      tools: [
        {
          name: 'swiss_weather_search_meteoswiss',
          description: 'Search MeteoSwiss open datasets — historical weather, climate data, radar, forecasts and more.',
          params: ['query', 'rows'],
          requiresAuth: false,
        },
        {
          name: 'swiss_avalanche_data',
          description: 'Get avalanche warning and snow data from SLF (Institute for Snow and Avalanche Research).',
          params: ['query'],
          requiresAuth: false,
        },
        {
          name: 'swiss_hydro_data',
          description: 'Get hydrological data — river levels, flow rates and flood forecasts from BAFU (Federal Office for the Environment).',
          params: ['station_id'],
          requiresAuth: false,
        },
      ],
    },
    {
      id: 'food',
      label: 'Food',
      abbr: 'FO',
      color: '#86EFAC',
      bgColor: 'rgba(134, 239, 172, 0.1)',
      description: 'Swiss food product database (FoodRepo) and official FSVO nutrition composition data.',
      tools: [
        {
          name: 'swiss_food_search_products',
          description: 'Search Swiss food products in FoodRepo by product name or barcode.',
          params: ['query', 'barcode', 'page'],
          requiresAuth: true,
          authKey: 'FOODREPO_API_KEY',
        },
        {
          name: 'swiss_food_nutrition_database',
          description: 'Search the Swiss Food Composition Database (FSVO) for detailed nutritional information.',
          params: ['query'],
          requiresAuth: false,
        },
      ],
    },
    {
      id: 'statistics',
      label: 'Statistics',
      abbr: 'ST',
      color: '#F472B6',
      bgColor: 'rgba(244, 114, 182, 0.1)',
      description: 'BFS/OFS statistical datasets, SNB financial data, postal codes and migration statistics.',
      tools: [
        {
          name: 'swiss_statistics_search',
          description: 'Search the Swiss Federal Statistical Office (BFS/OFS) open datasets.',
          params: ['query', 'rows'],
          requiresAuth: false,
        },
        {
          name: 'swiss_snb_financial_data',
          description: 'Get Swiss National Bank (SNB) financial and monetary data — interest rates, exchange rates, balance sheet.',
          params: ['query'],
          requiresAuth: false,
        },
        {
          name: 'swiss_postal_data',
          description: 'Get Swiss postal codes, street names and administrative divisions via OpenPLZ API.',
          params: ['postal_code', 'municipality', 'canton'],
          requiresAuth: false,
        },
        {
          name: 'swiss_migration_statistics',
          description: 'Get Swiss migration and population data from SEM (State Secretariat for Migration).',
          params: ['query'],
          requiresAuth: false,
        },
      ],
    },
  ]

  const allTools = computed((): ToolWithCategory[] =>
    categories.flatMap(c => c.tools.map(tool => ({ ...tool, categoryId: c.id })))
  )
  const totalTools = computed(() => allTools.value.length)
  const freeTools = computed(() => allTools.value.filter(t => !t.requiresAuth).length)

  return { categories, allTools, totalTools, freeTools }
}
