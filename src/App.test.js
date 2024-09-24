import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import App from './App';

test('renders conatins all initial elements', () => {
  render(<App />);
  const linkElement = screen.getByText(/Enter your markdown text to convert it to HTML./i);
  expect(linkElement).toBeInTheDocument();

  const markdownTextEntryElement = screen.getByTestId('markdown-entry-text-field');
  expect(markdownTextEntryElement).toBeInTheDocument();

  const convertButtonElement = screen.getByTestId('convert-button');
  expect(convertButtonElement).toBeInTheDocument();

  const clearButtonElement = screen.getByTestId('clear-button');
  expect(clearButtonElement).toBeInTheDocument();

  const convertedHtmlElement = screen.getByTestId('html-display');
  expect(convertedHtmlElement).toBeInTheDocument();
});

test("the markdown text field should take input", () => {
  render(<App />);
  const markdownTextEntryElement = screen.getByTestId('markdown-entry-text-field-input');
  expect(markdownTextEntryElement).not.toBeNull();

  userEvent.type(markdownTextEntryElement, 'this is test text');
  expect(markdownTextEntryElement).toHaveValue('this is test text');
});

test("the clear button should clear input", () => {
  render(<App />);
  const markdownTextEntryElement = screen.getByTestId('markdown-entry-text-field-input');
  expect(markdownTextEntryElement).not.toBeNull();

  userEvent.type(markdownTextEntryElement, 'this is test text');
  expect(markdownTextEntryElement).toHaveValue('this is test text');

  const clearButtonElement = screen.getByTestId('clear-button');
  expect(clearButtonElement).not.toBeNull();

  fireEvent.click(clearButtonElement);
  expect(markdownTextEntryElement).toHaveValue('');
});

test("the convert button should convert input", async () => {
  const {rerender} = render(<App />);
  const markdownTextEntryElement = screen.getByTestId('markdown-entry-text-field-input');
  expect(markdownTextEntryElement).not.toBeNull();

  userEvent.type(markdownTextEntryElement, 'this is test text');
  expect(markdownTextEntryElement).toHaveValue('this is test text');

  const convertButtonElement = screen.getByTestId('convert-button');
  expect(convertButtonElement).not.toBeNull();

  fireEvent.click(convertButtonElement);
  expect(markdownTextEntryElement).toHaveValue('this is test text');
});
