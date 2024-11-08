import React from 'react';

export default function AdditionalInput({
  label,
  toggleEnabled,
  changeValue,
  state,
}) {
  const onChange = e => {
    changeValue(e.target.value);
  };
  return (
    <>
      <label className="block mb-1 text-sm">{label}</label>
      <div className="relative">
        <div className="absolute top-1/2 -translate-y-1/2 left-0 flex items-center pl-3">
          <input
            type="checkbox"
            onChange={() => toggleEnabled()}
            checked={state.isEnabled}
          />
          <div className="h-8 border-l border-slate-200 ml-2" />
        </div>
        <input
          type="number"
          inputMode="numeric"
          defaultValue={state.value}
          disabled={state.isEnabled && !state.isChangeable}
          onChange={onChange}
          className={`w-full bg-white placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pl-10 px-3 py-3 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow ${
            state.isEnabled ? '' : 'disabled:bg-slate-200'
          }`}
        />
      </div>
    </>
  );
}
