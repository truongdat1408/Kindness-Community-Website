const URLS: Object = {
	LOGIN: '/login',
	REGISTER: '/register',
	ADHOME: '/admin/home',
	USERS: '/admin/users',
	PROFILE: '/admin/profile'
};

const LINK_TYPE: Object = {
	TEXT_CSS: {type: 'text/css', rel: 'stylesheet'},
	IMG_ICON: {type: 'image/png', rel: 'icon'},
};

export default class ApplicationConstant{
    static
	get urls(): Object {
		return URLS;
	}

	static
	get link_types(): Object {
		return LINK_TYPE;
	}
}