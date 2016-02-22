/* Copyright (C) 2015 Pracxs Net & ITCE - All Rights Reserved
 * You may use, distribute and modify this code under the
 * terms of the Prometheus courses license.
 *
 * You should have received a copy of the Prometheus courses
 * license.If not, please write to: prometheus@pracxs.com
 * or to prometheus@itce.com
 */
 
angular.module('pracxs.translate', ['pascalprecht.translate'])
	.config(['$translateProvider', function($translateProvider) {
		
		$translateProvider.useSanitizeValueStrategy('escape')
		.determinePreferredLanguage()
		//.preferredLanguage('bg')
		.useStaticFilesLoader({
			prefix: 'lang/trans_',
			suffix: '.json'
		})
		.registerAvailableLanguageKeys(['bg', 'en', 'de']);
		//.useLocalStorage();
		
	}]);