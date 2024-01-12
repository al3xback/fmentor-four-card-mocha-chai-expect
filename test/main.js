import { expect } from 'chai';
import jsdom from 'jsdom';
import got from 'got';

const { JSDOM } = jsdom;

const url = 'https://al3xback.github.io/fmentor-four-card-mocha-chai-expect/';

const getData = () => {
	return got(url)
		.then((res) => {
			const { document } = new JSDOM(res.body).window;
			return document;
		})
		.catch((err) => {
			throw new Error(err);
		});
};

describe('DOM', () => {
	beforeEach(async () => {
		try {
			const document = await getData();
			global.document = document;
		} catch (err) {
			console.log(err);
		}
	});

	it('should have a number type of each card list image width and height attribute values', () => {
		const cardImgEls = document.querySelectorAll('.card__image img');

		for (let i = 0; i < cardImgEls.length; i++) {
			const cardImgEl = cardImgEls[i];
			const cardImgWidth = cardImgEl.width;
			const cardImgHeight = cardImgEl.height;

			expect(cardImgWidth).to.be.a('number');
			expect(cardImgHeight).to.be.a('number');
		}
	});

	it("should have a title element that contains 'Reliable, efficient delivery' word", () => {
		const sectionTitleEl = document.querySelector('.section__title');
		const sectionTitle = sectionTitleEl.textContent.trim();

		expect(sectionTitle).to.equal('Reliable, efficient delivery');
	});

	it('should have two children inside of the section element', () => {
		const sectionEl = document.querySelector('section');
		const sectionChildrenEls = sectionEl.children;

		expect(sectionChildrenEls).to.have.lengthOf(2);
	});

	it('should have an empty alt attribute value of each card list item image element', () => {
		const cardListItemImgEls =
			document.querySelectorAll('.card__image img');

		for (let i = 0; i < cardListItemImgEls.length; i++) {
			const cardListItemImgAlt = cardListItemImgEls[i].alt;

			expect(cardListItemImgAlt).to.be.empty;
		}
	});
});
