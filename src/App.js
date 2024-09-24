import './App.css';
import { useState } from 'react';
import { Button, Box, TextField } from '@mui/material';
import { convertToHTML } from './markdown-converter';

function App() {
  const [markdown, setMarkdown] = useState('');
  const [html, setHtml] = useState('');

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Enter your markdown text to convert it to HTML.
        </p>
        <Box
          component="form"
          sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="outlined-multiline-flexible"
            label="Markdown Input"
            data-testid="markdown-entry-text-field"
            inputProps={{ "data-testid": "markdown-entry-text-field-input" }}
            multiline
            value={markdown}
            onChange={e => setMarkdown(e.target.value)}
          />
        </Box>
        <div>
          <Button
            sx={{ m: 1 }}
            variant="contained"
            data-testid="convert-button"
            onClick={() => {
              setHtml(convertToHTML(markdown));
            }}>
            Convert
          </Button>
          <Button
            variant="contained"
            data-testid="clear-button"
            onClick={() => { setMarkdown(''); setHtml(''); }}>
            Clear
          </Button>
        </div>
        <div className="App-html" data-testid="html-display">{html}</div>
      </header>
    </div>
  );
}

export default App;
