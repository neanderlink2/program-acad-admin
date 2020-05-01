import React, { useState, useEffect, useMemo, useRef } from 'react';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

import '../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './overrides.css';
import { useField } from '@unform/core';

export const EditorField = ({ name, initialValue = "<p>Digite a descrição do algoritmo aqui...</p>" }) => {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [html, setHtml] = useState('');
    const editorRef = useRef(null);

    const { defaultValue = initialValue, fieldName, registerField, error } = useField(name);
    useEffect(() => {
        registerField({
            name: fieldName,
            ref: editorRef.current,
            getValue(ref) {
                return html;
            }
        });
    }, [fieldName, registerField, html]);

    useEffect(() => {
        const contentBlock = htmlToDraft(defaultValue);
        if (contentBlock) {
            const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
            setEditorState(EditorState.createWithContent(contentState));
        }
    }, [defaultValue])

    useEffect(() => {
        if (editorState) {
            setHtml(draftToHtml(convertToRaw(editorState.getCurrentContent())));
        }
    }, [editorState]);

    return (
        <>
            <Editor wrapperClassName="wrapper-class"
                toolbarClassName="toolbar"
                editorClassName="descricao-algoritmo-wrapper"
                editorState={editorState}
                onEditorStateChange={(newState) => setEditorState(newState)}
                editorRef={(ref) => {
                    if (ref) {
                        editorRef.current = ref;
                    }
                }}
                toolbar={{
                    options: ['inline', 'blockType', 'fontSize', 'textAlign', 'list', 'colorPicker', 'emoji', 'history']
                }}
            />
        </>
    )
}