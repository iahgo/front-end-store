import React from 'react';
import PropTypes from 'prop-types';

function CategoriaCard({ categoria }) {
  return (
    <div>
      <label htmlFor={ categoria.id } data-testid="category">
        <input
          id={ categoria.id }
          type="radio"
          value={ categoria.id }
          name="categoria"
        />
        { categoria.name }
      </label>
    </div>
  );
}

CategoriaCard.propTypes = {
  categoria: PropTypes.shape({}),
}.isRequired;

export default CategoriaCard;
