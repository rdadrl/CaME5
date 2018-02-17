'use strict';

const DEBUG = {
	enabled: true,
	log: function (msg) {
		if (this.enabled) console.log(msg);
		return this.enabled;
	}
};