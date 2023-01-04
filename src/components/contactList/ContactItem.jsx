import style from '../contactList/ContactList.module.css';

export const ContactItem = ({ contact: { name, number, id }, onDelete }) => {
  return (
    <>
      <p>
        {' '}
        <button
          className={style.form_btn_del}
          type="button"
          onClick={() => {
            onDelete(id);
          }}
        >
          X
        </button>{' '}
        {name} : {number}{' '}
      </p>
    </>
  );
};
