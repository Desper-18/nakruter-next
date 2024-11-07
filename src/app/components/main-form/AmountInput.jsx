'use client';

export default function AmountInput({ amount, setAmount }) {
  const onIncrease = e => {
    setAmount(prev => {
      const increment =
        e.ctrlKey && e.shiftKey ? 1000 : e.ctrlKey ? 100 : e.shiftKey ? 10 : 1;
      return Math.min(100_000, prev + increment); // Ensure amount doesn't go over 100k
    });
  };
  const onDecrease = e => {
    setAmount(prev => {
      const decrement =
        e.ctrlKey && e.shiftKey ? 1000 : e.ctrlKey ? 100 : e.shiftKey ? 10 : 1;
      return Math.max(0, prev - decrement); // Ensure amount doesn't go below 0
    });
  };
  const onAmountChange = evt => {
    const { value } = evt.target;
    setAmount(Number(value.replace(/\D/g, '')));
  };
  const onWheel = e => {
    e.preventDefault(); // Prevents the page from scrolling
    if (e.deltaY < 0) {
      // Scrolling up
      onIncrease(e);
    } else {
      // Scrolling down
      onDecrease(e);
    }
  };
  return (
    <>
      <label className="block mb-1 text-sm ">Нужно получить</label>
      <div className="relative">
        <button
          onClick={onDecrease}
          className="absolute right-9 top-1/2 -translate-y-1/2 rounded bg-slate-800 p-1.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="button"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4"
          >
            <path d="M3.75 7.25a.75.75 0 0 0 0 1.5h8.5a.75.75 0 0 0 0-1.5h-8.5Z" />
          </svg>
        </button>
        <input
          id="amountInput"
          type="text"
          inputMode="numeric"
          value={amount}
          onChange={onAmountChange}
          onWheel={onWheel}
          className="w-full bg-white placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-3 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
        <button
          id="increaseButton"
          onClick={onIncrease}
          className="absolute right-1 top-1/2 -translate-y-1/2 rounded bg-slate-800 p-1.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="button"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4"
          >
            <path d="M8.75 3.75a.75.75 0 0 0-1.5 0v3.5h-3.5a.75.75 0 0 0 0 1.5h3.5v3.5a.75.75 0 0 0 1.5 0v-3.5h3.5a.75.75 0 0 0 0-1.5h-3.5v-3.5Z" />
          </svg>
        </button>
      </div>
    </>
  );
}
