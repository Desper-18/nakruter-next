'use client';
import { useEffect, useMemo, useReducer, useRef, useState } from 'react';
import AmountInput from './AmountInput';
import AdditionalInput from './AdditionalInput';
import useIndicator from './useIndicator';

export default function MainForm() {
  const [amount, setAmount] = useState(1500);

  const bonusIndicator = useIndicator({
    rate: 4,
    isEnabled: false,
    isChangeable: true,
  });
  const simplifiedTaxIndicator = useIndicator({ rate: 6, isEnabled: true });
  const bankFeeIndicator = useIndicator({ rate: 0.9, isEnabled: true });
  const socialTaxIndicator = useIndicator({
    rate: 1,
    isEnabled: false,
    isChangeable: true,
  });
  let totalAmount =
    amount +
    bonusIndicator.state.value +
    simplifiedTaxIndicator.state.value +
    bankFeeIndicator.state.value +
    socialTaxIndicator.state.value;
  const amountWithBonus = amount + bonusIndicator.state.value;

  useEffect(() => {
    if (simplifiedTaxIndicator.state.isEnabled) {
      simplifiedTaxIndicator.calculateValue(
        simplifiedTaxIndicator.state.value === 0
          ? amountWithBonus
          : totalAmount,
      );
    }
    if (bankFeeIndicator.state.isEnabled) {
      bankFeeIndicator.calculateValue(
        bankFeeIndicator.state.value === 0 ? amountWithBonus : totalAmount,
      );
    }
    if (socialTaxIndicator.state.isEnabled) {
      socialTaxIndicator.calculateValue(
        socialTaxIndicator.state.value === 0 ? amountWithBonus : totalAmount,
      );
    }
  }, [
    totalAmount,
    amountWithBonus,
    simplifiedTaxIndicator.state.isEnabled,
    bankFeeIndicator.state.isEnabled,
    socialTaxIndicator.state.isEnabled,
  ]);

  useEffect(() => {
    bonusIndicator.calculateValue(amount);
  }, [amount, bonusIndicator.state.isEnabled]);

  return (
    <form className="grid sm:grid-cols-2 xl:grid-cols-6 gap-9 px-4 py-3 max-w-[60vmax] mx-auto">
      <div className="sm:col-span-2 xl:col-span-3">
        <AmountInput amount={amount} setAmount={setAmount} />
      </div>
      <div className="xl:col-span-3">
        <AdditionalInput
          label={'4% бонус'}
          state={bonusIndicator.state}
          toggleEnabled={bonusIndicator.toggleEnabled}
          changeValue={bonusIndicator.changeValue}
        />
      </div>
      <div className="xl:col-span-2">
        <AdditionalInput
          label={'6% упрощ. налог'}
          state={simplifiedTaxIndicator.state}
          toggleEnabled={simplifiedTaxIndicator.toggleEnabled}
        />
      </div>
      <div className="xl:col-span-2">
        <AdditionalInput
          label={'0.9% комиссия'}
          state={bankFeeIndicator.state}
          toggleEnabled={bankFeeIndicator.toggleEnabled}
        />
      </div>
      <div className="xl:col-span-2">
        <AdditionalInput
          label={'1% соц.налог'}
          state={socialTaxIndicator.state}
          toggleEnabled={socialTaxIndicator.toggleEnabled}
          changeValue={socialTaxIndicator.changeValue}
        />
      </div>
      <div className="sm:col-span-2 xl:col-span-6 text-center text-7xl my-4 font-bold">
        {totalAmount.toLocaleString('en', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}{' '}
        TJS
      </div>
      <div className="sm:col-span-2 xl:col-span-6">
        <button
          type="submit"
          className="rounded-md w-full bg-slate-500 py-2.5 px-5 border border-transparent text-center text-base text-white transition-all shadow-sm hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        >
          Rasschitat
        </button>
      </div>
    </form>
  );
}
