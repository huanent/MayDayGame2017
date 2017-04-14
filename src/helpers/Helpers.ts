class Helpers {
	/**
	 * 生成随机数0-9输入(0,9)
	 */
	static getRandomNum(min: number, max: number): number {
		max++;
		return Math.floor(min + Math.random() * (max - min));
	}
}