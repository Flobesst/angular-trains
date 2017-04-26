import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {

	createDb() {
		let trips = [{
			id: 1,
			train_number: 123,
			destination: 'Luxembourg',
			time: '18:00',
			way: '9AB',
			delay: 0,
			cancelled: false
		}];

		let cities = [{
			id: 1,
			name: 'Luxembourg'
		}, {
			id: 2,
			name: 'Esch/Alzette'
		}, {
			id: 3,
			name: 'Leudelange'
		}];

		let ways = [{
			id: 1,
			name: '3AB'
		}, {
			id: 2,
			name: '3CD'
		}, {
			id: 3,
			name: '4AB'
		}, {
			id: 4,
			name: '4CD'
		}, {
			id: 4,
			name: '5AB'
		}, {
			id: 4,
			name: '5CD'
		}];

		return { trips, cities, ways };
	}

}