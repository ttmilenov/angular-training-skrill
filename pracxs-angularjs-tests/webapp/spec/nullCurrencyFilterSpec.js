/* Copyright (C) 2015 Pracxs Net & ITCE - All Rights Reserved
 * You may use, distribute and modify this code under the
 * terms of the Prometheus courses license.
 *
 * You should have received a copy of the Prometheus courses
 * license.If not, please write to: prometheus@pracxs.com
 * or to prometheus@itce.com
 */

'use strict';

describe( 'nullCurrency filter', function() {
  var nullCurrencyFilter;

   beforeEach(module('pracxsApp.filters'));
   beforeEach(inject(function($filter) {
     nullCurrencyFilter = $filter('nullCurrency');
	 console.log('--------------------------------------------------------');
   }));

   it('should return empty string', function() {
     expect(nullCurrencyFilter('')).toBe('');
     expect(nullCurrencyFilter(null)).toBe('');
     expect(nullCurrencyFilter(0)).toBe('');
     expect(nullCurrencyFilter('0')).toBe('');
   });
  
   it('should return formated number with currency symbol', function() {
     expect(nullCurrencyFilter(1.2)).toBe('$1.20');
     expect(nullCurrencyFilter(1.235)).toBe('$1.24');
   });
});
