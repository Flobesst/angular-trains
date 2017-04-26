export class Trip {

	constructor(
		public id: number,
		public train_number: number,
		public destination: string,
		public time: string,
		public delay: number,
		public cancelled: boolean
	) { }

}