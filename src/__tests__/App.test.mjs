import '@testing-library/jest-dom';
import { render, fireEvent, screen, cleanup } from '@testing-library/react';
import App from '../App.mjs';
import { enableFetchMocks } from 'jest-fetch-mock'
import { act } from 'react-test-renderer';

enableFetchMocks()

function onClick() {
	return "hiya";
}
/*
jest.mock('../r_list_display.mjs', () => {
  const R_LIST_DISPLAY = ({ onClick }) => {
    return (
      <div>
        <button data-testid="b1" onClick={() => onClick('Button 3 clicked')}>b3</button>
        <button data-testid="b2" onClick={() => onClick('Button 3 clicked')}>b3</button>
        <button data-testid="b3" onClick={() => onClick('Button 3 clicked')}>b3</button>
      </div>
    );
  };
  return R_LIST_DISPLAY;
});
*/
/*
jest.mock('../r_commands.mjs', () => {
  const mocked_r_commands = ({ onClick }) => {
    return (
      <div>
        <button data-testid="b1" onClick={() => onClick('Button 1 clicked')}>b1</button>
        <button data-testid="b2" onClick={() => onClick('Button 2 clicked')}>b2</button>
        <button data-testid="b3" onClick={() => onClick('Button 3 clicked')}>b3</button>
      </div>
    );
  };

  return mocked_r_commands;
});
*/
/*jest.mock("../r_commands", () => () => {
	return (
		<button data-testid="my_button-button" onClick={onClick}>
			Click me
		</button>
	);
});*/

jest.mock("react-datepicker/dist/react-datepicker.css", () => {
	return "body { color: blue; }";
});

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve( 
		{
			"eid": 100, 
			"em_body": "message body",
			"em_from": "from of message",
			"em_to": "to of message",
			"em_subject": "subject of message",
			"received": "date of message"
		}),
	  text: () => Promise.resolve(JSON.stringify([
		  {
			"eid": 100, 
			"em_body": "message body",
			"em_from": "from of message",
			"em_to": "to of message",
			"em_subject": "subject of message",
			"received": "date of message"
		  }
	  ]))
  })
);

beforeEach(() => {
  fetch.mockClear();
});

afterEach(() => {
	cleanup();
});

const click_func = jest.fn();

describe("App", () => {
test("UT check button_prev", async () => {

	let container;
	await act(async() => {
		container = render(<App />);
	});
});
}) // describe
