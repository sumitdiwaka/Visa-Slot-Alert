import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { COUNTRIES, CITIES, VISA_TYPES, STATUSES } from '../utils/constants';

const AlertForm = ({ onSubmit, initialData, isEditing }) => {
  const { register, handleSubmit, formState: { errors }, reset, watch, setValue } = useForm({
    defaultValues: initialData || {
      country: '',
      city: '',
      visaType: 'Tourist',
      status: 'Active'
    }
  });

  const selectedCountry = watch('country');
  const [availableCities, setAvailableCities] = useState([]);

  useEffect(() => {
    if (selectedCountry && CITIES[selectedCountry]) {
      setAvailableCities(CITIES[selectedCountry]);
    } else {
      setAvailableCities([]);
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (initialData) {
      reset(initialData);
      if (initialData.country && CITIES[initialData.country]) {
        setAvailableCities(CITIES[initialData.country]);
      }
    }
  }, [initialData, reset]);

  const onSubmitForm = (data) => {
    onSubmit(data);
    if (!isEditing) {
      reset();
      setAvailableCities([]);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4">
      <div>
        <label className="input-label">
          Country *
        </label>
        <select
          {...register('country', { required: 'Country is required' })}
          className="input-field"
        >
          <option value="">Select a country</option>
          {COUNTRIES.map(country => (
            <option key={country.value} value={country.value}>
              {country.flag} {country.label}
            </option>
          ))}
        </select>
        {errors.country && (
          <p className="mt-1 text-sm text-red-600">{errors.country.message}</p>
        )}
      </div>

      <div>
        <label className="input-label">
          City *
        </label>
        <select
          {...register('city', { required: 'City is required' })}
          className="input-field"
          disabled={!selectedCountry}
        >
          <option value="">Select a city</option>
          {availableCities.map(city => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>
        {errors.city && (
          <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>
        )}
      </div>

      <div>
        <label className="input-label">
          Visa Type *
        </label>
        <select
          {...register('visaType', { required: 'Visa type is required' })}
          className="input-field"
        >
          {VISA_TYPES.map(type => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
        {errors.visaType && (
          <p className="mt-1 text-sm text-red-600">{errors.visaType.message}</p>
        )}
      </div>

      {isEditing && (
        <div>
          <label className="input-label">
            Status *
          </label>
          <select
            {...register('status', { required: 'Status is required' })}
            className="input-field"
          >
            {STATUSES.map(status => (
              <option key={status.value} value={status.value}>
                {status.label}
              </option>
            ))}
          </select>
          {errors.status && (
            <p className="mt-1 text-sm text-red-600">{errors.status.message}</p>
          )}
        </div>
      )}

      <div className="pt-4">
        <button type="submit" className="btn-primary w-full">
          {isEditing ? 'Update Alert' : 'Create Alert'}
        </button>
      </div>
    </form>
  );
};

export default AlertForm;