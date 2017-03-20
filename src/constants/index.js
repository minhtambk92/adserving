/* eslint-disable import/prefer-default-export */

// Default constants
export const SET_RUNTIME_VARIABLE = 'SET_RUNTIME_VARIABLE';
export const SET_LOCALE_START = 'SET_LOCALE_START';
export const SET_LOCALE_SUCCESS = 'SET_LOCALE_SUCCESS';
export const SET_LOCALE_ERROR = 'SET_LOCALE_ERROR';

// Model states
export const STATUS_ACTIVE = 'active';
export const STATUS_INACTIVE = 'inactive';

// Menu types
export const TYPE_MENU = 'menu';
export const TYPE_MENU_HEADER = 'header';
export const TYPE_MENU_ITEM = 'item';

// Redux actions
export const GET_RESOURCE = 'GET_RESOURCE';
export const GET_RESOURCE_ERROR = 'GET_RESOURCE_ERROR';
export const GET_RESOURCES = 'GET_RESOURCES';
export const GET_RESOURCES_ERROR = 'GET_RESOURCES_ERROR';
export const CREATE_RESOURCE = 'CREATE_RESOURCE';
export const CREATE_RESOURCE_ERROR = 'CREATE_RESOURCE_ERROR';
export const UPDATE_RESOURCE = 'UPDATE_RESOURCE';
export const UPDATE_RESOURCE_ERROR = 'UPDATE_RESOURCE_ERROR';
export const DELETE_RESOURCE = 'DELETE_RESOURCE';
export const DELETE_RESOURCE_ERROR = 'DELETE_RESOURCE_ERROR';
export const GET_RESOURCES_FILTERS = 'GET_RESOURCES_FILTERS';
export const GET_RESOURCES_FILTERS_ERROR = 'GET_RESOURCES_FILTERS_ERROR';
export const SET_RESOURCES_FILTERS = 'SET_RESOURCES_FILTERS';
export const SET_RESOURCES_FILTERS_ERROR = 'SET_RESOURCES_FILTERS_ERROR';
export const SET_CURRENT_PAGE_RESOURCE = 'SET_CURRENT_PAGE_RESOURCE';
export const SET_CURRENT_PAGE_RESOURCE_ERROR = 'SET_CURRENT_PAGE_RESOURCE_ERROR';

export const GET_MENU = 'GET_MENU';
export const GET_MENU_ERROR = 'GET_MENU_ERROR';
export const GET_MENUS = 'GET_MENUS';
export const GET_MENUS_ERROR = 'GET_MENUS_ERROR';
export const CREATE_MENU = 'CREATE_MENU';
export const CREATE_MENU_ERROR = 'CREATE_MENU_ERROR';
export const UPDATE_MENU = 'UPDATE_MENU';
export const UPDATE_MENU_ERROR = 'UPDATE_MENU_ERROR';
export const DELETE_MENU = 'DELETE_MENU';
export const DELETE_MENU_ERROR = 'DELETE_MENU_ERROR';
export const GET_ASIDE_LEFT_MENU = 'GET_ASIDE_LEFT_MENU';
export const GET_ASIDE_LEFT_MENU_ERROR = 'GET_ASIDE_LEFT_MENU_ERROR';
export const SET_ASIDE_LEFT_ACTIVE_ITEMS = 'SET_ASIDE_LEFT_ACTIVE_ITEMS';
export const SET_ASIDE_LEFT_ACTIVE_ITEMS_ERROR = 'SET_ASIDE_LEFT_ACTIVE_ITEMS_ERROR';

export const GET_SITE = 'GET_SITE';
export const GET_SITE_ERROR = 'GET_SITE_ERROR';
export const GET_SITES = 'GET_SITES';
export const GET_SITES_ERROR = 'GET_SITES_ERROR';
export const CREATE_SITE = 'CREATE_SITE';
export const CREATE_SITE_ERROR = 'CREATE_SITE_ERROR';
export const UPDATE_SITE = 'UPDATE_SITE';
export const UPDATE_SITE_ERROR = 'UPDATE_SITE_ERROR';
export const DELETE_SITE = 'DELETE_SITE';
export const DELETE_SITE_ERROR = 'DELETE_SITE_ERROR';
export const CHECK_SITE_BY_DOMAIN = 'CHECK_SITE_BY_DOMAIN';
export const CHECK_SITE_BY_DOMAIN_ERROR = 'CHECK_SITE_BY_DOMAIN_ERROR';
export const SET_PAGE_SITE_ACTIVE_TAB = 'SET_PAGE_SITE_ACTIVE_TAB';
export const SET_PAGE_SITE_ACTIVE_TAB_ERROR = 'SET_PAGE_SITE_ACTIVE_TAB_ERROR';
export const SET_CURRENT_SHARE = 'SET_CURRENT_SHARE';
export const SET_CURRENT_SHARE_ERROR = 'SET_CURRENT_SHARE_ERROR';

export const GET_ZONE = 'GET_ZONE';
export const GET_ZONE_ERROR = 'GET_ZONE_ERROR';
export const GET_ZONES = 'GET_ZONES';
export const GET_ZONES_ERROR = 'GET_ZONES_ERROR';
export const CREATE_ZONE = 'CREATE_ZONE';
export const CREATE_ZONE_ERROR = 'CREATE_ZONE_ERROR_ERROR';
export const UPDATE_ZONE = 'UPDATE_ZONE';
export const UPDATE_ZONE_ERROR = 'UPDATE_ZONE_ERROR';
export const DELETE_ZONE = 'DELETE_ZONE';
export const DELETE_ZONE_ERROR = 'DELETE_ZONE_ERROR';
export const GET_ZONES_FILTERS = 'GET_ZONES_FILTERS';
export const GET_ZONES_FILTERS_ERROR = 'GET_ZONES_FILTERS_ERROR';
export const SET_ZONES_FILTERS = 'SET_ZONES_FILTERS';
export const SET_ZONES_FILTERS_ERROR = 'SET_ZONES_FILTERS_ERROR';
export const SET_PAGE_ZONE_ACTIVE_TAB = 'SET_PAGE_ZONE_ACTIVE_TAB';
export const SET_PAGE_ZONE_ACTIVE_TAB_ERROR = 'SET_PAGE_ZONE_ACTIVE_TAB_ERROR';
export const SET_STATUS_SHARE_FORM_EDIT = 'SET_STATUS_SHARE_FORM_EDIT';
export const SET_STATUS_SHARE_FORM_EDIT_ERROR = 'SET_STATUS_SHARE_FORM_EDIT_ERROR';
export const SET_STATUS_SHARE_FORM_CREATE = 'SET_STATUS_SHARE_FORM_CREATE';
export const SET_STATUS_SHARE_FORM_CREATE_ERROR = 'SET_STATUS_SHARE_FORM_CREATE_ERROR';

export const GET_ZONE_TYPE = 'GET_ZONE_TYPE';
export const GET_ZONE_TYPE_ERROR = 'GET_ZONE_TYPE_ERROR';
export const GET_ZONE_TYPES = 'GET_ZONE_TYPES';
export const GET_ZONE_TYPES_ERROR = 'GET_ZONE_TYPES_ERROR';
export const CREATE_ZONE_TYPE = 'CREATE_ZONE_TYPE';
export const CREATE_ZONE_TYPE_ERROR = 'CREATE_ZONE_TYPE_ERROR';
export const UPDATE_ZONE_TYPE = 'UPDATE_ZONE_TYPE';
export const UPDATE_ZONE_TYPE_ERROR = 'UPDATE_ZONE_TYPE_ERROR';
export const DELETE_ZONE_TYPE = 'DELETE_ZONE_TYPE';
export const DELETE_ZONE_TYPE_ERROR = 'DELETE_ZONE_TYPE_ERROR';
export const SET_STATUS_UPDATE_ZONE_TYPE = 'SET_STATUS_UPDATE_ZONE_TYPE';
export const SET_STATUS_UPDATE_ZONE_TYPE_ERROR = 'SET_STATUS_UPDATE_ZONE_TYPE_ERROR';
export const SET_STATUS_CREATE_ZONE_TYPE = 'SET_STATUS_CREATE_ZONE_TYPE';
export const SET_STATUS_CREATE_ZONE_TYPE_ERROR = 'SET_STATUS_CREATE_ZONE_TYPE_ERROR';

export const GET_ZONE_SIZE_TYPE = 'GET_ZONE_SIZE_TYPE';
export const GET_ZONE_SIZE_TYPE_ERROR = 'GET_ZONE_SIZE_TYPE_ERROR';
export const GET_ZONE_SIZE_TYPES = 'GET_ZONE_SIZE_TYPES';
export const GET_ZONE_SIZE_TYPES_ERROR = 'GET_ZONE_SIZE_TYPES_ERROR';
export const CREATE_ZONE_SIZE_TYPE = 'CREATE_ZONE_SIZE_TYPE';
export const CREATE_ZONE_SIZE_TYPE_ERROR = 'CREATE_ZONE_SIZE_TYPE_ERROR';
export const UPDATE_ZONE_SIZE_TYPE = 'UPDATE_ZONE_SIZE_TYPE';
export const UPDATE_ZONE_SIZE_TYPE_ERROR = 'UPDATE_ZONE_SIZE_TYPE_ERROR';
export const DELETE_ZONE_SIZE_TYPE = 'DELETE_ZONE_SIZE_TYPE';
export const DELETE_ZONE_SIZE_TYPE_ERROR = 'DELETE_ZONE_SIZE_TYPE_ERROR';
export const SET_STATUS_UPDATE_ZONE_SIZE_TYPE = 'SET_STATUS_UPDATE_ZONE_SIZE_TYPE';
export const SET_STATUS_UPDATE_ZONE_SIZE_TYPE_ERROR = 'SET_STATUS_UPDATE_ZONE_SIZE_TYPE_ERROR';
export const SET_STATUS_CREATE_ZONE_SIZE_TYPE = 'SET_STATUS_CREATE_ZONE_SIZE_TYPE';
export const SET_STATUS_CREATE_ZONE_SIZE_TYPE_ERROR = 'SET_STATUS_CREATE_ZONE_SIZE_TYPE_ERROR';

export const GET_USER = 'GET_USER';
export const GET_USER_ERROR = 'GET_USER_ERROR';
export const GET_USER_PROFILE = 'GET_USER_PROFILE';
export const GET_USER_PROFILE_ERROR = 'GET_USER_PROFILE_ERROR';
export const GET_USERS = 'GET_USERS';
export const GET_USERS_ERROR = 'GET_USERS_ERROR';
export const CREATE_USER = 'CREATE_USER';
export const CREATE_USER_ERROR = 'CREATE_USER_ERROR';
export const UPDATE_USER = 'UPDATE_USER';
export const UPDATE_USER_ERROR = 'UPDATE_USER_ERROR';
export const UPDATE_PROFILE = 'UPDATE_PROFILE';
export const UPDATE_PROFILE_ERROR = 'UPDATE_PROFILE_ERROR';
export const DELETE_USER = 'DELETE_USER';
export const DELETE_USER_ERROR = 'DELETE_USER_ERROR';
export const GET_USERS_FILTERS = 'GET_USERS_FILTERS';
export const GET_USERS_FILTERS_ERROR = 'GET_USERS_FILTERS_ERROR';
export const SET_USERS_FILTERS = 'SET_USERS_FILTERS';
export const SET_USERS_FILTERS_ERROR = 'SET_USERS_FILTERS_ERROR';
export const SIGN_USER_UP = 'SIGN_USER_UP';
export const SIGN_USER_UP_ERROR = 'SIGN_USER_UP_ERROR';
export const LOG_USER_IN = 'LOG_USER_IN';
export const LOG_USER_IN_ERROR = 'LOG_USER_IN_ERROR';
export const LOG_USER_OUT = 'LOG_USER_OUT';
export const LOG_USER_OUT_ERROR = 'LOG_USER_OUT_ERROR';
export const SET_STATUS_UPDATE_USER = 'SET_STATUS_UPDATE_USER';
export const SET_STATUS_UPDATE_USER_ERROR = 'SET_STATUS_UPDATE_USER_ERROR';
export const SET_STATUS_CREATE_USER = 'SET_STATUS_CREATE_USER';
export const SET_STATUS_CREATE_USER_ERROR = 'SET_STATUS_CREATE_USER_ERROR';
export const SET_STATUS_UPDATE_PROFILE = 'SET_STATUS_UPDATE_PROFILE';
export const SET_STATUS_UPDATE_PROFILE_ERROR = 'SET_STATUS_UPDATE_PROFILE_ERROR';
export const SET_PAGE_PROFILE_ACTIVE_TAB = 'SET_PAGE_PROFILE_ACTIVE_TAB';
export const SET_PAGE_PROFILE_ACTIVE_TAB_ERROR = 'SET_PAGE_PROFILE_ACTIVE_TAB_ERROR';

export const GET_ROLE = 'GET_ROLE';
export const GET_ROLE_ERROR = 'GET_ROLE_ERROR';
export const GET_ROLES = 'GET_ROLES';
export const GET_ROLES_ERROR = 'GET_ROLES_ERROR';
export const CREATE_ROLE = 'CREATE_ROLE';
export const CREATE_ROLE_ERROR = 'CREATE_ROLE_ERROR';
export const UPDATE_ROLE = 'UPDATE_ROLE';
export const UPDATE_ROLE_ERROR = 'UPDATE_ROLE_ERROR';
export const DELETE_ROLE = 'DELETE_ROLE';
export const DELETE_ROLE_ERROR = 'DELETE_ROLE_ERROR';
export const GET_ROLES_FILTERS = 'GET_ROLES_FILTERS';
export const GET_ROLES_FILTERS_ERROR = 'GET_ROLES_FILTERS_ERROR';
export const SET_ROLES_FILTERS = 'SET_ROLES_FILTERS';
export const SET_ROLES_FILTERS_ERROR = 'SET_ROLES_FILTERS_ERROR';
export const SET_STATUS_UPDATE_ROLE = 'SET_STATUS_UPDATE_ROLE';
export const SET_STATUS_UPDATE_ROLE_ERROR = 'SET_STATUS_UPDATE_ROLE_ERROR';
export const SET_STATUS_CREATE_ROLE = 'SET_STATUS_CREATE_ROLE';
export const SET_STATUS_CREATE_ROLE_ERROR = 'SET_STATUS_CREATE_ROLE_ERROR';

export const GET_OPTION = 'GET_OPTION';
export const GET_OPTION_ERROR = 'GET_OPTION_ERROR';
export const GET_OPTIONS = 'GET_OPTIONS';
export const GET_OPTIONS_ERROR = 'GET_OPTIONS_ERROR';
export const CREATE_OPTION = 'CREATE_OPTION';
export const CREATE_OPTION_ERROR = 'CREATE_OPTION_ERROR';
export const UPDATE_OPTION = 'UPDATE_OPTION';
export const UPDATE_OPTION_ERROR = 'UPDATE_OPTION_ERROR';
export const DELETE_OPTION = 'DELETE_OPTION';
export const DELETE_OPTION_ERROR = 'DELETE_OPTION_ERROR';
export const SET_STATUS_UPDATE_OPTION = 'SET_STATUS_UPDATE_OPTION';
export const SET_STATUS_UPDATE_OPTION_ERROR = 'SET_STATUS_UPDATE_OPTION_ERROR';
export const SET_STATUS_CREATE_OPTION = 'SET_STATUS_CREATE_OPTION';
export const SET_STATUS_CREATE_OPTION_ERROR = 'SET_STATUS_CREATE_OPTION_ERROR';

export const GET_BANNER_HTML_TYPE = 'GET_BANNER_HTML_TYPE';
export const GET_BANNER_HTML_TYPE_ERROR = 'GET_BANNER_HTML_TYPE_ERROR';
export const GET_BANNER_HTML_TYPES = 'GET_BANNER_HTML_TYPES';
export const GET_BANNER_HTML_TYPES_ERROR = 'GET_BANNER_HTML_TYPES_ERROR';
export const CREATE_BANNER_HTML_TYPE = 'CREATE_BANNER_HTML_TYPE';
export const CREATE_BANNER_HTML_TYPE_ERROR = 'CREATE_BANNER_HTML_TYPE_ERROR';
export const UPDATE_BANNER_HTML_TYPE = 'UPDATE_BANNER_HTML_TYPE';
export const UPDATE_BANNER_HTML_TYPE_ERROR = 'UPDATE_BANNER_HTML_TYPE_ERROR';
export const DELETE_BANNER_HTML_TYPE = 'DELETE_BANNER_HTML_TYPE';
export const DELETE_BANNER_HTML_TYPE_ERROR = 'DELETE_BANNER_HTML_TYPE_ERROR';
export const SET_STATUS_UPDATE_BANNER_HTML_TYPE = 'SET_STATUS_UPDATE_BANNER_HTML_TYPE';
export const SET_STATUS_UPDATE_BANNER_HTML_TYPE_ERROR = 'SET_STATUS_UPDATE_BANNER_HTML_TYPE_ERROR';
export const SET_STATUS_CREATE_BANNER_HTML_TYPE = 'SET_STATUS_CREATE_BANNER_HTML_TYPE';
export const SET_STATUS_CREATE_BANNER_HTML_TYPE_ERROR = 'SET_STATUS_CREATE_BANNER_HTML_TYPE_ERROR';

export const GET_BANNER_TYPE = 'GET_BANNER_TYPE';
export const GET_BANNER_TYPE_ERROR = 'GET_BANNER_TYPE_ERROR';
export const GET_BANNER_TYPES = 'GET_BANNER_TYPES';
export const GET_BANNER_TYPES_ERROR = 'GET_BANNER_TYPES_ERROR';
export const CREATE_BANNER_TYPE = 'CREATE_BANNER_TYPE';
export const CREATE_BANNER_TYPE_ERROR = 'CREATE_BANNER_TYPE_ERROR';
export const UPDATE_BANNER_TYPE = 'UPDATE_BANNER_TYPE';
export const UPDATE_BANNER_TYPE_ERROR = 'UPDATE_BANNER_TYPE_ERROR';
export const DELETE_BANNER_TYPE = 'DELETE_BANNER_TYPE';
export const DELETE_BANNER_TYPE_ERROR = 'DELETE_BANNER_TYPE_ERROR';
export const SET_STATUS_UPDATE_BANNER_TYPE = 'SET_STATUS_UPDATE_BANNER_TYPE';
export const SET_STATUS_UPDATE_BANNER_TYPE_ERROR = 'SET_STATUS_UPDATE_BANNER_TYPE_ERROR';
export const SET_STATUS_CREATE_BANNER_TYPE = 'SET_STATUS_CREATE_BANNER_TYPE';
export const SET_STATUS_CREATE_BANNER_TYPE_ERROR = 'SET_STATUS_CREATE_BANNER_TYPE_ERROR';

export const GET_ADS_SERVER = 'GET_ADS_SERVER';
export const GET_ADS_SERVER_ERROR = 'GET_ADS_SERVER_ERROR';
export const GET_ADS_SERVERS = 'GET_ADS_SERVERS';
export const GET_ADS_SERVERS_ERROR = 'GET_ADS_SERVERS_ERROR';
export const CREATE_ADS_SERVER = 'CREATE_ADS_SERVER';
export const CREATE_ADS_SERVER_ERROR = 'CREATE_ADS_SERVER_ERROR';
export const UPDATE_ADS_SERVER = 'UPDATE_ADS_SERVER';
export const UPDATE_ADS_SERVER_ERROR = 'UPDATE_ADS_SERVER_ERROR';
export const DELETE_ADS_SERVER = 'DELETE_ADS_SERVER';
export const DELETE_ADS_SERVER_ERROR = 'DELETE_ADS_SERVER_ERROR';
export const SET_STATUS_UPDATE_ADS_SERVER = 'SET_STATUS_UPDATE_ADS_SERVER';
export const SET_STATUS_UPDATE_ADS_SERVER_ERROR = 'SET_STATUS_UPDATE_ADS_SERVER_ERROR';
export const SET_STATUS_CREATE_ADS_SERVER = 'SET_STATUS_CREATE_ADS_SERVER';
export const SET_STATUS_CREATE_ADS_SERVER_ERROR = 'SET_STATUS_CREATE_ADS_SERVER_ERROR';

export const GET_PERMISSION = 'GET_PERMISSION';
export const GET_PERMISSION_ERROR = 'GET_PERMISSION_ERROR';
export const GET_PERMISSIONS = 'GET_PERMISSIONS';
export const GET_PERMISSIONS_ERROR = 'GET_PERMISSIONS_ERROR';
export const CREATE_PERMISSION = 'CREATE_PERMISSION';
export const CREATE_PERMISSION_ERROR = 'CREATE_PERMISSION_ERROR';
export const UPDATE_PERMISSION = 'UPDATE_PERMISSION';
export const UPDATE_PERMISSION_ERROR = 'UPDATE_PERMISSION_ERROR';
export const DELETE_PERMISSION = 'DELETE_PERMISSION';
export const DELETE_PERMISSION_ERROR = 'DELETE_PERMISSION_ERROR';
export const SET_STATUS_UPDATE_PERMISSION = 'SET_STATUS_UPDATE_PERMISSION';
export const SET_STATUS_UPDATE_PERMISSION_ERROR = 'SET_STATUS_UPDATE_PERMISSION_ERROR';
export const SET_STATUS_CREATE_PERMISSION = 'SET_STATUS_CREATE_PERMISSION';
export const SET_STATUS_CREATE_PERMISSION_ERROR = 'SET_STATUS_CREATE_PERMISSION_ERROR';

export const GET_ADVERTISER = 'GET_ADVERTISER';
export const GET_ADVERTISER_ERROR = 'GET_ADVERTISER_ERROR';
export const GET_ADVERTISERS = 'GET_ADVERTISERS';
export const GET_ADVERTISERS_ERROR = 'GET_ADVERTISERS_ERROR';
export const CREATE_ADVERTISER = 'CREATE_ADVERTISER';
export const CREATE_ADVERTISER_ERROR = 'CREATE_ADVERTISER_ERROR';
export const UPDATE_ADVERTISER = 'UPDATE_ADVERTISER';
export const UPDATE_ADVERTISER_ERROR = 'UPDATE_ADVERTISER_ERROR';
export const DELETE_ADVERTISER = 'DELETE_ADVERTISER';
export const DELETE_ADVERTISER_ERROR = 'DELETE_ADVERTISER_ERROR';
export const SET_PAGE_ADVERTISER_ACTIVE_TAB = 'SET_PAGE_ADVERTISER_ACTIVE_TAB';
export const SET_PAGE_ADVERTISER_ACTIVE_TAB_ERROR = 'SET_PAGE_ADVERTISER_ACTIVE_TAB_ERROR';

export const GET_CAMPAIGN = 'GET_CAMPAIGN';
export const GET_CAMPAIGN_ERROR = 'GET_CAMPAIGN_ERROR';
export const GET_CAMPAIGNS = 'GET_CAMPAIGNS';
export const GET_CAMPAIGNS_ERROR = 'GET_CAMPAIGNS_ERROR';
export const CREATE_CAMPAIGN = 'CREATE_CAMPAIGN';
export const CREATE_CAMPAIGN_ERROR = 'CREATE_CAMPAIGN_ERROR';
export const UPDATE_CAMPAIGN = 'UPDATE_CAMPAIGN';
export const UPDATE_CAMPAIGN_ERROR = 'UPDATE_CAMPAIGN_ERROR';
export const DELETE_CAMPAIGN = 'DELETE_CAMPAIGN';
export const DELETE_CAMPAIGN_ERROR = 'DELETE_CAMPAIGN_ERROR';
export const GET_CAMPAIGNS_FILTERS = 'GET_CAMPAIGNS_FILTERS';
export const GET_CAMPAIGNS_FILTERS_ERROR = 'GET_CAMPAIGNS_FILTERS_ERROR';
export const SET_CAMPAIGNS_FILTERS = 'SET_CAMPAIGNS_FILTERS';
export const SET_CAMPAIGNS_FILTERS_ERROR = 'SET_CAMPAIGNS_FILTERS_ERROR';
export const SET_PAGE_CAMPAIGN_ACTIVE_TAB = 'SET_PAGE_CAMPAIGN_ACTIVE_TAB';
export const SET_PAGE_CAMPAIGN_ACTIVE_TAB_ERROR = 'SET_PAGE_CAMPAIGN_ACTIVE_TAB_ERROR';

export const GET_PLACEMENT = 'GET_PLACEMENT';
export const GET_PLACEMENT_ERROR = 'GET_PLACEMENT_ERROR';
export const GET_PLACEMENTS = 'GET_PLACEMENTS';
export const GET_PLACEMENTS_ERROR = 'GET_PLACEMENTS_ERROR';
export const CREATE_PLACEMENT = 'CREATE_PLACEMENT';
export const CREATE_PLACEMENT_ERROR = 'CREATE_PLACEMENT_ERROR';
export const UPDATE_PLACEMENT = 'UPDATE_PLACEMENT';
export const UPDATE_PLACEMENT_ERROR = 'UPDATE_PLACEMENT_ERROR';
export const DELETE_PLACEMENT = 'DELETE_PLACEMENT';
export const DELETE_PLACEMENT_ERROR = 'DELETE_PLACEMENT_ERROR';
export const GET_PLACEMENTS_FILTERS = 'GET_PLACEMENTS_FILTERS';
export const GET_PLACEMENTS_FILTERS_ERROR = 'GET_PLACEMENTS_FILTERS_ERROR';
export const SET_PLACEMENTS_FILTERS = 'SET_PLACEMENTS_FILTERS';
export const SET_PLACEMENTS_FILTERS_ERROR = 'SET_PLACEMENTS_FILTERS_ERROR';
export const SET_PAGE_PLACEMENT_ACTIVE_TAB = 'SET_PAGE_PLACEMENT_ACTIVE_TAB';
export const SET_PAGE_PLACEMENT_ACTIVE_TAB_ERROR = 'SET_PAGE_PLACEMENT_ACTIVE_TAB_ERROR';

export const GET_BANNER = 'GET_BANNER';
export const GET_BANNER_ERROR = 'GET_BANNER_ERROR';
export const GET_BANNERS = 'GET_BANNERS';
export const GET_BANNERS_ERROR = 'GET_BANNERS_ERROR';
export const CREATE_BANNER = 'CREATE_BANNER';
export const CREATE_BANNER_ERROR = 'CREATE_BANNER_ERROR';
export const UPDATE_BANNER = 'UPDATE_BANNER';
export const UPDATE_BANNER_ERROR = 'UPDATE_BANNER_ERROR';
export const DELETE_BANNER = 'DELETE_BANNER';
export const DELETE_BANNER_ERROR = 'DELETE_BANNER_ERROR';
export const SET_BANNERS_FILTERS = 'SET_BANNERS_FILTERS';
export const SET_BANNERS_FILTERS_ERROR = 'SET_BANNERS_FILTERS_ERROR';
export const GET_BANNERS_FILTERS = 'GET_BANNERS_FILTERS';
export const GET_BANNERS_FILTERS_ERROR = 'GET_BANNERS_FILTERS_ERROR';
export const SET_PAGE_BANNER_ACTIVE_TAB = 'SET_PAGE_BANNER_ACTIVE_TAB';
export const SET_PAGE_BANNER_ACTIVE_TAB_ERROR = 'SET_PAGE_BANNER_ACTIVE_TAB_ERROR';

export const GET_CHANNEL = 'GET_CHANNEL';
export const GET_CHANNEL_ERROR = 'GET_CHANNEL_ERROR';
export const GET_CHANNELS_ERROR = 'GET_CHANNELS_ERROR';
export const GET_CHANNELS = 'GET_CHANNELS';
export const CREATE_CHANNEL = 'CREATE_CHANNEL';
export const CREATE_CHANNEL_ERROR = 'CREATE_CHANNEL_ERROR';
export const UPDATE_CHANNEL = 'UPDATE_CHANNEL';
export const UPDATE_CHANNEL_ERROR = 'UPDATE_CHANNEL_ERROR';
export const DELETE_CHANNEL = 'DELETE_CHANNEL';
export const DELETE_CHANNEL_ERROR = 'DELETE_CHANNEL_ERROR';
export const SET_CHANNELS_FILTERS = 'SET_CHANNELS_FILTERS';
export const SET_CHANNELS_FILTERS_ERROR = 'SET_CHANNELS_FILTERS_ERROR';
export const GET_CHANNELS_FILTERS = 'GET_CHANNELS_FILTERS';
export const GET_CHANNELS_FILTERS_ERROR = 'GET_CHANNELS_FILTERS_ERROR';
export const SET_PAGE_CHANNEL_ACTIVE_TAB = 'SET_PAGE_CHANNEL_ACTIVE_TAB';
export const SET_PAGE_CHANNEL_ACTIVE_TAB_ERROR = 'SET_PAGE_CHANNEL_ACTIVE_TAB_ERROR';

export const GET_OPTION_CHANNEL_BY_CHANNEL_ID = 'GET_OPTION_CHANNEL_BY_CHANNEL_ID';
export const GET_OPTION_CHANNEL_BY_CHANNEL_ID_ERROR = 'GET_OPTION_CHANNEL_BY_CHANNEL_ID_ERROR';
export const GET_OPTION_CHANNELS = 'GET_OPTION_CHANNELS';
export const GET_OPTION_CHANNELS_ERROR = 'GET_OPTION_CHANNELS_ERROR';
export const CREATE_OPTION_CHANNEL = 'CREATE_OPTION_CHANNEL';
export const CREATE_OPTION_CHANNEL_ERROR = 'CREATE_OPTION_CHANNEL_ERROR';
export const UPDATE_OPTION_CHANNEL = 'UPDATE_OPTION_CHANNEL';
export const UPDATE_OPTION_CHANNEL_ERROR = 'UPDATE_OPTION_CHANNEL_ERROR';
export const DELETE_OPTION_CHANNEL = 'DELETE_OPTION_CHANNEL';
export const DELETE_OPTION_CHANNEL_ERROR = 'DELETE_OPTION_CHANNEL_ERROR';

export const GET_OPTION_CHANNEL_VALUE = 'GET_OPTION_CHANNEL_VALUE';
export const GET_OPTION_CHANNEL_VALUE_ERROR = 'GET_OPTION_CHANNEL_VALUE_ERROR';
export const GET_OPTION_CHANNEL_VALUE_IS_PROPERTIES = 'GET_OPTION_CHANNEL_VALUE_IS_PROPERTIES';
export const GET_OPTION_CHANNEL_VALUE_IS_PROPERTIES_ERROR = 'GET_OPTION_CHANNEL_VALUE_IS_PROPERTIES_ERROR';
export const GET_OPTION_CHANNEL_VALUES = 'GET_OPTION_CHANNEL_VALUES';
export const GET_OPTION_CHANNEL_VALUES_ERROR = 'GET_OPTION_CHANNEL_VALUES_ERROR';
export const CREATE_OPTION_CHANNEL_VALUE = 'CREATE_OPTION_CHANNEL_VALUE';
export const CREATE_OPTION_CHANNEL_VALUE_ERROR = 'CREATE_OPTION_CHANNEL_VALUE_ERROR';
export const UPDATE_OPTION_CHANNEL_VALUE = 'UPDATE_OPTION_CHANNEL_VALUE';
export const UPDATE_OPTION_CHANNEL_VALUE_ERROR = 'UPDATE_OPTION_CHANNEL_VALUE_ERROR';
export const DELETE_OPTION_CHANNEL_VALUE = 'DELETE_OPTION_CHANNEL_VALUE';
export const DELETE_OPTION_CHANNEL_VALUE_ERROR = 'DELETE_OPTION_CHANNEL_VALUE_ERROR';
export const SET_OPTION_CHANNEL_VALUE_FILTER = 'SET_OPTION_CHANNEL_VALUE_FILTER';
export const SET_OPTION_CHANNEL_VALUE_FILTER_ERROR = 'SET_OPTION_CHANNEL_VALUE_FILTER_ERROR';
export const GET_OPTION_CHANNEL_VALUE_FILTER = 'GET_OPTION_CHANNEL_VALUE_FILTER';
export const GET_OPTION_CHANNEL_VALUE_FILTER_ERROR = 'GET_OPTION_CHANNEL_VALUE_FILTER_ERROR';
export const SET_STATUS_CREATE_OPTION_CHANNEL_VALUE = 'SET_STATUS_CREATE_OPTION_CHANNEL_VALUE';
export const SET_STATUS_CREATE_OPTION_CHANNEL_VALUE_ERROR = 'SET_STATUS_CREATE_OPTION_CHANNEL_VALUE_ERROR';
export const SET_STATUS_UPDATE_OPTION_CHANNEL_VALUE = 'SET_STATUS_UPDATE_OPTION_CHANNEL_VALUE';
export const SET_STATUS_UPDATE_OPTION_CHANNEL_VALUE_ERROR = 'SET_STATUS_UPDATE_OPTION_CHANNEL_VALUE_ERROR';

export const GET_OPTION_CHANNEL_VALUE_PROPERTY = 'GET_OPTION_CHANNEL_VALUE_PROPERTY';
export const GET_OPTION_CHANNEL_VALUE_PROPERTY_ERROR = 'GET_OPTION_CHANNEL_VALUE_PROPERTY_ERROR';
export const GET_OPTION_CHANNEL_VALUE_PROPERTIES = 'GET_OPTION_CHANNEL_VALUE_PROPERTIES';
export const GET_OPTION_CHANNEL_VALUE_PROPERTIES_ERROR = 'GET_OPTION_CHANNEL_VALUE_PROPERTIES_ERROR';
export const CREATE_OPTION_CHANNEL_VALUE_PROPERTY = 'CREATE_OPTION_CHANNEL_VALUE_PROPERTY';
export const CREATE_OPTION_CHANNEL_VALUE_PROPERTY_ERROR = 'CREATE_OPTION_CHANNEL_VALUE_PROPERTY_ERROR';
export const UPDATE_OPTION_CHANNEL_VALUE_PROPERTY = 'UPDATE_OPTION_CHANNEL_VALUE_PROPERTY';
export const UPDATE_OPTION_CHANNEL_VALUE_PROPERTY_ERROR = 'UPDATE_OPTION_CHANNEL_VALUE_PROPERTY_ERROR';
export const DELETE_OPTION_CHANNEL_VALUE_PROPERTY = 'DELETE_OPTION_CHANNEL_VALUE_PROPERTY';
export const DELETE_OPTION_CHANNEL_VALUE_PROPERTY_ERROR = 'DELETE_OPTION_CHANNEL_VALUE_PROPERTY_ERROR';
export const SET_OPTION_CHANNEL_VALUE_PROPERTY_FILTER = 'SET_OPTION_CHANNEL_VALUE_PROPERTY_FILTER';
export const SET_OPTION_CHANNEL_VALUE_PROPERTY_FILTER_ERROR = 'SET_OPTION_CHANNEL_VALUE_PROPERTY_FILTER_ERROR';
export const GET_OPTION_CHANNEL_VALUE_PROPERTY_FILTER = 'GET_OPTION_CHANNEL_VALUE_PROPERTY_FILTER';
export const GET_OPTION_CHANNEL_VALUE_PROPERTY_FILTER_ERROR = 'GET_OPTION_CHANNEL_VALUE_PROPERTY_FILTER_ERROR';
export const SET_STATUS_CREATE_OPTION_CHANNEL_VALUE_PROPERTY = 'SET_STATUS_CREATE_OPTION_CHANNEL_VALUE_PROPERTY';
export const SET_STATUS_CREATE_OPTION_CHANNEL_VALUE_PROPERTY_ERROR = 'SET_STATUS_CREATE_OPTION_CHANNEL_VALUE_PROPERTY_ERROR';
export const SET_STATUS_UPDATE_OPTION_CHANNEL_VALUE_PROPERTY = 'SET_STATUS_UPDATE_OPTION_CHANNEL_VALUE_PROPERTY';
export const SET_STATUS_UPDATE_OPTION_CHANNEL_VALUE_PROPERTY_ERROR = 'SET_STATUS_UPDATE_OPTION_CHANNEL_VALUE_PROPERTY_ERROR';

export const GET_TRACK_BY_BANNER_ID = 'GET_TRACK_BY_BANNER_ID';
export const GET_TRACK_BY_BANNER_ID_ERROR = 'GET_TRACK_BY_BANNER_ID_ERROR';
export const GET_TRACKS = 'GET_TRACKS';
export const GET_TRACKS_ERROR = 'GET_TRACKS_ERROR';
export const CREATE_TRACK = 'CREATE_TRACK';
export const CREATE_TRACK_ERROR = 'CREATE_TRACK_ERROR';
export const UPDATE_TRACK = 'UPDATE_TRACK';
export const UPDATE_TRACK_ERROR = 'UPDATE_TRACK_ERROR';
export const DELETE_TRACK = 'DELETE_TRACK';
export const DELETE_TRACK_ERROR = 'DELETE_TRACK_ERROR';

export const GET_SHARE_BY_ZONE_ID = 'GET_SHARE_BY_ZONE_ID';
export const GET_SHARE_BY_ZONE_ID_ERROR = 'GET_SHARE_BY_ZONE_ID_ERROR';
export const GET_SHARES = 'GET_SHARES';
export const GET_SHARES_ERROR = 'GET_SHARES_ERROR';
export const CREATE_SHARE = 'CREATE_SHARE';
export const CREATE_SHARE_ERROR = 'CREATE_SHARE_ERROR';
export const UPDATE_SHARE = 'UPDATE_SHARE';
export const UPDATE_SHARE_ERROR = 'UPDATE_SHARE_ERROR';
export const DELETE_SHARE = 'DELETE_SHARE';
export const DELETE_SHARE_ERROR = 'DELETE_SHARE_ERROR';
export const GET_SHARE = 'GET_SHARE';
export const GET_SHARE_ERROR = 'GET_SHARE_ERROR';

export const GET_ACTIVITIES_BY_SUBJECT_ID = 'GET_ACTIVITIES_BY_SUBJECT_ID';
export const GET_ACTIVITIES_BY_SUBJECT_ID_ERROR = 'GET_ACTIVITIES_BY_SUBJECT_ID_ERROR';
export const GET_ACTIVITIES_BY_USER_ID = 'GET_ACTIVITIES_BY_USER_ID';
export const GET_ACTIVITIES_BY_USER_ID_ERROR = 'GET_ACTIVITIES_BY_USER_ID_ERROR';
export const GET_ACTIVITIES = 'GET_ACTIVITIES';
export const GET_ACTIVITIES_ERROR = 'GET_ACTIVITIES_ERROR';
export const CREATE_ACTIVITY = 'CREATE_ACTIVITY';
export const CREATE_ACTIVITY_ERROR = 'CREATE_ACTIVITY_ERROR';
export const UPDATE_ACTIVITY = 'UPDATE_ACTIVITY';
export const UPDATE_ACTIVITY_ERROR = 'UPDATE_ACTIVITY_ERROR';
export const DELETE_ACTIVITY = 'DELETE_ACTIVITY';
export const DELETE_ACTIVITY_ERROR = 'DELETE_ACTIVITY_ERROR';
export const GET_ACTIVITY = 'GET_ACTIVITY';
export const GET_ACTIVITY_ERROR = 'GET_ACTIVITY_ERROR';

export const GET_CHARACTER_SET = 'GET_CHARACTER_SET';
export const GET_CHARACTER_SET_ERROR = 'GET_CHARACTER_SET_ERROR';
export const GET_CHARACTER_SETS = 'GET_CHARACTER_SETS';
export const GET_CHARACTER_SETS_ERROR = 'GET_CHARACTER_SETS_ERROR';
export const CREATE_CHARACTER_SET = 'CREATE_CHARACTER_SET';
export const CREATE_CHARACTER_SET_ERROR = 'CREATE_CHARACTER_SET_ERROR';
export const UPDATE_CHARACTER_SET = 'UPDATE_CHARACTER_SET';
export const UPDATE_CHARACTER_SET_ERROR = 'UPDATE_CHARACTER_SET_ERROR';
export const DELETE_CHARACTER_SET = 'DELETE_CHARACTER_SET';
export const DELETE_CHARACTER_SET_ERROR = 'DELETE_CHARACTER_SET_ERROR';
export const SET_STATUS_UPDATE_CHARACTER_SET = 'SET_STATUS_UPDATE_CHARACTER_SET';
export const SET_STATUS_UPDATE_CHARACTER_SET_ERROR = 'SET_STATUS_UPDATE_CHARACTER_SET_ERROR';
export const SET_STATUS_CREATE_CHARACTER_SET = 'SET_STATUS_CREATE_CHARACTER_SET';
export const SET_STATUS_CREATE_CHARACTER_SET_ERROR = 'SET_STATUS_CREATE_CHARACTER_SET_ERROR';

export const GET_OPTION_CHANNEL_TYPES = 'GET_OPTION_CHANNEL_TYPES';
export const GET_OPTION_CHANNEL_TYPES_ERROR = 'GET_OPTION_CHANNEL_TYPES_ERROR';
export const CREATE_OPTION_CHANNEL_TYPE = 'CREATE_OPTION_CHANNEL_TYPE';
export const CREATE_OPTION_CHANNEL_TYPE_ERROR = 'CREATE_OPTION_CHANNEL_TYPE_ERROR';
export const UPDATE_OPTION_CHANNEL_TYPE = 'UPDATE_OPTION_CHANNEL_TYPE';
export const UPDATE_OPTION_CHANNEL_TYPE_ERROR = 'UPDATE_OPTION_CHANNEL_TYPE_ERROR';
export const DELETE_OPTION_CHANNEL_TYPE = 'DELETE_OPTION_CHANNEL_TYPE';
export const DELETE_OPTION_CHANNEL_TYPE_ERROR = 'DELETE_OPTION_CHANNEL_TYPE_ERROR';
export const SET_STATUS_UPDATE_OPTION_CHANNEL_TYPE = 'SET_STATUS_UPDATE_OPTION_CHANNEL_TYPE';
export const SET_STATUS_UPDATE_OPTION_CHANNEL_TYPE_ERROR = 'SET_STATUS_UPDATE_OPTION_CHANNEL_TYPE_ERROR';
export const SET_STATUS_CREATE_OPTION_CHANNEL_TYPE = 'SET_STATUS_CREATE_OPTION_CHANNEL_TYPE';
export const SET_STATUS_CREATE_OPTION_CHANNEL_TYPE_ERROR = 'SET_STATUS_CREATE_OPTION_CHANNEL_TYPE_ERROR';
export const GET_OPTION_CHANNEL_TYPE_IS_SELECT_OPTION = 'GET_OPTION_CHANNEL_TYPE_IS_SELECT_OPTION';
export const GET_OPTION_CHANNEL_TYPE_IS_SELECT_OPTION_ERROR = 'GET_OPTION_CHANNEL_TYPE_IS_SELECT_OPTION_ERROR';

export const SET_STATUS_UPDATE_PROFILE_USER = 'SET_STATUS_UPDATE_PROFILE_USER';
export const SET_STATUS_UPDATE_PROFILE_USER_ERROR = 'SET_STATUS_UPDATE_PROFILE_USER_ERROR';

