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
		
		.translations('bg', {
			'HELLO': 'Здравей',
			'EXIT': 'Излез',
			'MENU': 'Меню',
			'TOTAL': 'Всичко',
			'ORDER': 'Поръчай',
			'MENU-ITEM-NAME': 'Име',
			'MENU-ITEM-AVAILABLE': 'Наличност',
			'MENU-ITEM-PRICE': 'Цена',
			'MENU-ITEM-QUANTITY': 'Брой',
			'MENU-ITEM-TOTAL': 'Общо',
		})
		
		.translations('en', {
			'HELLO': 'Hello',
			'EXIT': 'Exit',
			'MENU': 'Menu',
			'TOTAL': 'Total',
			'ORDER': 'Order',
			'MENU-ITEM-NAME': 'Name',
			'MENU-ITEM-AVAILABLE': 'Available',
			'MENU-ITEM-PRICE': 'Price',
			'MENU-ITEM-QUANTITY': 'Quantity',
			'MENU-ITEM-TOTAL': 'Total',
		})
		
		.fallbackLanguage('bg')
		.determinePreferredLanguage();
	}]);