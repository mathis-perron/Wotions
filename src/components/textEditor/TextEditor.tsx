import 'react-quill/dist/quill.snow.css';

import dynamic from 'next/dynamic';

// CONVERT
// import { convert } from 'html-to-text';
// const text = convert(content, {
//   wordwrap: 130,
// });

const QuillNoSSRWrapper = dynamic(import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

const modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    ['link', 'image', 'video'],
    [{ align: [] }],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    ['clean'],
  ],
  clipboard: {
    matchVisual: false,
  },
};

const formats = [
  'header',
  'size',
  'font',
  'bold',
  'align',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'video',
];

interface TextEditorProps {
  onChange: (content: string) => void;
}

const TextEditor: React.FC<TextEditorProps> = ({ onChange }) => {
  return (
    <QuillNoSSRWrapper
      modules={modules}
      formats={formats}
      theme="snow"
      placeholder="Type text here"
      onChange={onChange}
      className="w-full rounded-lg border-jacarta-100 bg-white dark:bg-jacarta-700 dark:text-white dark:placeholder:text-jacarta-300"
    />
  );
};

export default TextEditor;
