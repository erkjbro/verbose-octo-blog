import { useState, useEffect, useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import useFetch from '../../shared/hooks/useFetch';
import { AuthContext } from '../../shared/context/AuthContext';
import { Card, ErrorMessage, Loader } from '../../shared/components/UIKit';
import { Button } from '../../shared/components/UIKit/FormElements';
import './EditBlog.scss';

const initialFormState = {
  title: {
    value: ''
  },
  content: {
    value: ''
  }
};

const EditBlog = (props) => {
  const { editMode } = props;

  const [blog, setBlog] = useState(initialFormState);
  const { token } = useContext(AuthContext);

  const history = useHistory();
  const { blogId } = useParams();

  const {
    isLoading,
    error,
    clearError,
    sendRequest
  } = useFetch(process.env.REACT_APP_BACKEND_URL);

  useEffect(() => document.title = `${editMode ? "Edit" : "New"} Blog | VOB`, [editMode]);

  useEffect(() => {
    if (editMode && blogId) {
      (async () => {
        const { data } = await sendRequest(`blogs/${blogId}`);

        if (data) {
          setBlog({
            ...initialFormState,
            title: {
              value: data.title
            },
            content: {
              value: data.content
            }
          });
        }
      })()
    } else {
      setBlog({ ...initialFormState });
    }
  }, [editMode, blogId, sendRequest]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const { title, content } = blog;

    const reqPath = editMode ? `blogs/${blogId}` : `blogs`;
    const reqMethod = editMode ? "PATCH" : "POST";

    try {
      await sendRequest(
        reqPath,
        reqMethod,
        JSON.stringify({
          title: title.value,
          content: content.value
        }),
        {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      );

      history.push('/blogs');
    } catch (err) {
      console.error(err.message);
    }
  }

  return (
    <>
      {error && <ErrorMessage message={error} onClick={clearError} />}
      {isLoading && <Loader />}
      {!isLoading && (
        <div className="edit__blog">
          {!editMode ? (
            <h1>Write Your New Blog!</h1>
          ) : (
            <h1>Edit Your Blog!</h1>
          )}
          <Card className="edit__blog--card">
            <form onSubmit={handleFormSubmit} className="edit__blog--form">
              <label>
                Title
                <br />
                <input
                  type="text"
                  id="title"
                  placeholder="Title your blog..."
                  value={blog.title.value}
                  onChange={(event) => setBlog({
                    ...blog,
                    title: {
                      value: event.target.value
                    }
                  })}
                />
              </label>
              <label>
                Content
                <br />
                <textarea
                  id="content"
                  placeholder="Start writing your blog..."
                  value={blog.content.value}
                  onChange={(event) => setBlog({
                    ...blog,
                    content: {
                      value: event.target.value
                    }
                  })}
                />
              </label>
              <Button type="submit" className="form__button">
                Save Blog
              </Button>
            </form>
          </Card>
        </div>
      )}
    </>
  );
};

export default EditBlog;
