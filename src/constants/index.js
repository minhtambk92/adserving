/* eslint-disable import/prefer-default-export */

// Default constants
export const SET_RUNTIME_VARIABLE = 'SET_RUNTIME_VARIABLE';
export const SET_LOCALE_START = 'SET_LOCALE_START';
export const SET_LOCALE_SUCCESS = 'SET_LOCALE_SUCCESS';
export const SET_LOCALE_ERROR = 'SET_LOCALE_ERROR';
export const FETCH_CONTENT_START = 'FETCH_CONTENT_START';
export const FETCH_CONTENT_SUCCESS = 'FETCH_CONTENT_SUCCESS';
export const FETCH_CONTENT_ERROR = 'FETCH_CONTENT_ERROR';

// Model states
export const STATUS_ACTIVE = 'active';
export const STATUS_INACTIVE = 'inactive';

// Menu types
export const TYPE_MENU = 'menu';
export const TYPE_MENU_HEADER = 'header';
export const TYPE_MENU_ITEM = 'item';

// Redux actions
export const GET_RESOURCE = 'GET_RESOURCE';
export const GET_RESOURCES = 'GET_RESOURCES';
export const CREATE_RESOURCE = 'CREATE_RESOURCE';
export const UPDATE_RESOURCE = 'UPDATE_RESOURCE';
export const DELETE_RESOURCE = 'DELETE_RESOURCE';
export const GET_RESOURCES_FILTERS = 'GET_RESOURCES_FILTERS';
export const SET_RESOURCES_FILTERS = 'SET_RESOURCES_FILTERS';

export const GET_MENU = 'GET_MENU';
export const GET_MENUS = 'GET_MENUS';
export const CREATE_MENU = 'CREATE_MENU';
export const UPDATE_MENU = 'UPDATE_MENU';
export const DELETE_MENU = 'DELETE_MENU';
export const GET_ASIDE_LEFT_MENU = 'GET_ASIDE_LEFT_MENU';
export const SET_ACTIVE_ITEMS = 'SET_ACTIVE_ITEMS';

export const GET_SITE = 'GET_SITE';
export const GET_SITES = 'GET_SITES';
export const CREATE_SITE = 'CREATE_SITE';
export const UPDATE_SITE = 'UPDATE_SITE';
export const DELETE_SITE = 'DELETE_SITE';
export const CHECK_SITE_BY_DOMAIN = 'CHECK_SITE_BY_DOMAIN';
export const SET_PAGE_SITE_ACTIVE_TAB = 'SET_PAGE_SITE_ACTIVE_TAB';
export const SET_CURRENT_SHARE = 'SET_CURRENT_SHARE';

export const GET_ZONE = 'GET_ZONE';
export const GET_ZONES = 'GET_ZONES';
export const CREATE_ZONE = 'CREATE_ZONE';
export const UPDATE_ZONE = 'UPDATE_ZONE';
export const DELETE_ZONE = 'DELETE_ZONE';
export const GET_ZONES_FILTERS = 'GET_ZONES_FILTERS';
export const SET_ZONES_FILTERS = 'SET_ZONES_FILTERS';
export const SET_PAGE_ZONE_ACTIVE_TAB = 'SET_PAGE_ZONE_ACTIVE_TAB';
export const SET_STATUS_SHARE_FORM_EDIT = 'SET_STATUS_SHARE_FORM_EDIT';
export const SET_STATUS_SHARE_FORM_CREATE = 'SET_STATUS_SHARE_FORM_CREATE';

export const GET_USER = 'GET_USER';
export const GET_USERS = 'GET_USERS';
export const CREATE_USER = 'CREATE_USER';
export const UPDATE_USER = 'UPDATE_USER';
export const DELETE_USER = 'DELETE_USER';
export const GET_USERS_FILTERS = 'GET_USERS_FILTERS';
export const SET_USERS_FILTERS = 'SET_USERS_FILTERS';
export const SIGN_USER_UP = 'SIGN_USER_UP';
export const LOG_USER_IN = 'LOG_USER_IN';
export const LOG_USER_OUT = 'LOG_USER_OUT';

export const GET_ROLE = 'GET_ROLE';
export const GET_ROLES = 'GET_ROLES';
export const CREATE_ROLE = 'CREATE_ROLE';
export const UPDATE_ROLE = 'UPDATE_ROLE';
export const DELETE_ROLE = 'DELETE_ROLE';
export const GET_ROLES_FILTERS = 'GET_ROLES_FILTERS';
export const SET_ROLES_FILTERS = 'SET_ROLES_FILTERS';

export const GET_ADVERTISER = 'GET_ADVERTISER';
export const GET_ADVERTISERS = 'GET_ADVERTISERS';
export const CREATE_ADVERTISER = 'CREATE_ADVERTISER';
export const UPDATE_ADVERTISER = 'UPDATE_ADVERTISER';
export const DELETE_ADVERTISER = 'DELETE_ADVERTISER';
export const SET_PAGE_ADVERTISER_ACTIVE_TAB = 'SET_PAGE_ADVERTISER_ACTIVE_TAB';

export const GET_CAMPAIGN = 'GET_CAMPAIGN';
export const GET_CAMPAIGNS = 'GET_CAMPAIGNS';
export const CREATE_CAMPAIGN = 'CREATE_CAMPAIGN';
export const UPDATE_CAMPAIGN = 'UPDATE_CAMPAIGN';
export const DELETE_CAMPAIGN = 'DELETE_CAMPAIGN';
export const GET_CAMPAIGNS_FILTERS = 'GET_CAMPAIGNS_FILTERS';
export const SET_CAMPAIGNS_FILTERS = 'SET_CAMPAIGNS_FILTERS';
export const SET_PAGE_CAMPAIGN_ACTIVE_TAB = 'SET_PAGE_CAMPAIGN_ACTIVE_TAB';

export const GET_PLACEMENT = 'GET_PLACEMENT';
export const GET_PLACEMENTS = 'GET_PLACEMENTS';
export const CREATE_PLACEMENT = 'CREATE_PLACEMENT';
export const UPDATE_PLACEMENT = 'UPDATE_PLACEMENT';
export const DELETE_PLACEMENT = 'DELETE_PLACEMENT';
export const GET_PLACEMENTS_FILTERS = 'GET_PLACEMENTS_FILTERS';
export const SET_PLACEMENTS_FILTERS = 'SET_PLACEMENTS_FILTERS';
export const SET_PAGE_PLACEMENT_ACTIVE_TAB = 'SET_PAGE_PLACEMENT_ACTIVE_TAB';

export const GET_BANNER = 'GET_BANNER';
export const GET_BANNERS = 'GET_BANNERS';
export const CREATE_BANNER = 'CREATE_BANNER';
export const UPDATE_BANNER = 'UPDATE_BANNER';
export const DELETE_BANNER = 'DELETE_BANNER';
export const SET_BANNERS_FILTERS = 'SET_BANNERS_FILTERS';
export const GET_BANNERS_FILTERS = 'GET_BANNERS_FILTERS';
export const SET_PAGE_BANNER_ACTIVE_TAB = 'SET_PAGE_BANNER_ACTIVE_TAB';

export const GET_CHANNEL = 'GET_CHANNEL';
export const GET_CHANNELS = 'GET_CHANNELS';
export const CREATE_CHANNEL = 'CREATE_CHANNEL';
export const UPDATE_CHANNEL = 'UPDATE_CHANNEL';
export const DELETE_CHANNEL = 'DELETE_CHANNEL';
export const SET_CHANNELS_FILTERS = 'SET_CHANNELS_FILTERS';
export const GET_CHANNELS_FILTERS = 'GET_CHANNELS_FILTERS';
export const SET_PAGE_CHANNEL_ACTIVE_TAB = 'SET_PAGE_CHANNEL_ACTIVE_TAB';

export const GET_OPTION_CHANNEL_BY_CHANNEL_ID = 'GET_OPTION_CHANNEL_BY_CHANNEL_ID';
export const GET_OPTION_CHANNELS = 'GET_OPTION_CHANNELS';
export const CREATE_OPTION_CHANNEL = 'CREATE_OPTION_CHANNEL';
export const UPDATE_OPTION_CHANNEL = 'UPDATE_OPTION_CHANNEL';
export const DELETE_OPTION_CHANNEL = 'DELETE_OPTION_CHANNEL';

export const GET_TRACK_BY_BANNER_ID = 'GET_TRACK_BY_BANNER_ID';
export const GET_TRACKS = 'GET_TRACKS';
export const CREATE_TRACK = 'CREATE_TRACK';
export const UPDATE_TRACK = 'UPDATE_TRACK';
export const DELETE_TRACK = 'DELETE_TRACK';

export const GET_SHARE_BY_ZONE_ID = 'GET_SHARE_BY_ZONE_ID';
export const GET_SHARES = 'GET_SHARES';
export const CREATE_SHARE = 'CREATE_SHARE';
export const UPDATE_SHARE = 'UPDATE_SHARE';
export const DELETE_SHARE = 'DELETE_SHARE';

export const REMOVE_SHARE_IN_SHARE_PLACEMENT = 'REMOVE_SHARE_IN_SHARE_PLACEMENT';
export const REMOVE_PLACEMENT = 'REMOVE_PLACEMENT';
export const CREATE_SHARE_PLACEMENT = 'CREATE_SHARE_PLACEMENT';
export const DELETE_SHARE_PLACEMENT = 'DELETE_SHARE_PLACEMENT';

export const CREATE_PLACEMENT_BANNER = 'CREATE_PLACEMENT_BANNER';
export const REMOVE_PLACEMENT_BANNER = 'REMOVE_PLACEMENT_BANNER';
export const GET_PLACEMENT_BY_BANNER_ID = 'GET_PLACEMENT_BY_BANNER_ID';
