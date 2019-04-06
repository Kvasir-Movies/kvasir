from threading import Thread
from datetime import datetime

DEFAULT_TIMEOUT = 10

"""
Class which extends Thread to expose a result from the target (input) function.
"""
class ResultThread(Thread):
    def __init__(self, **kwargs):
        super(ResultThread, self).__init__()
        self.target = kwargs.get('target')
    def run(self):
        self.result = self.target()

def get_now():
    return datetime.now().timestamp()

def call_one_func_parallel(inputs, func, timeout=DEFAULT_TIMEOUT):
    """
    Takes in a list of inputs and one function, which is run asynchronously across all inputs.
    Tuples of (input, result) are returned.
    Doctest below.

    >>> from time import sleep

    >>> def sleep_func(timeout):
    ...     sleep(timeout)
    ...     return timeout

    >>> call_one_func_parallel([7, 1, 1, 2], sleep_func)
    [(7, 7), (1, 1), (1, 1), (2, 2)]

    >>> call_one_func_parallel([7, 1, 1, 2], sleep_func, timeout=3)
    Traceback (most recent call last):
    ...
    RuntimeError: ('Service call took longer than max timeout of :', 3, 'seconds')
    """
    funcs = [func] * len(inputs)
    return call_parallel(inputs, funcs, timeout)

def call_parallel(inputs, funcs, timeout=DEFAULT_TIMEOUT):
    """
    Takes in lists of inputs and functions, which are then run asynchronously, and returns a list of their results.
    Doctest below.

    >>> from time import sleep

    >>> def sleep_func(timeout):
    ...     sleep(timeout)
    ...     return timeout

    >>> call_parallel([], [])
    []

    >>> call_parallel([5, 1, 3, 5], [sleep_func] * 4)
    [(5, 5), (1, 1), (3, 3), (5, 5)]

    >>> call_parallel([5, 1, 3, 5], [sleep_func] * 4, timeout=2)
    Traceback (most recent call last):
    ...
    RuntimeError: ('Service call took longer than max timeout of :', 2, 'seconds')
    """
    if len(inputs) != len(funcs):
        raise RuntimeError("# of inputs (", len(inputs), ") do not match # of functions (", len(funcs), ")")
    threads = []
    results = []
    start_time = get_now()
    for input, func in zip(inputs, funcs):
        new_thread = ResultThread(target=lambda: func(input), daemon=True)
        threads.append(new_thread)
        new_thread.start()
    for thread in threads:
        time_elapsed = get_now() - start_time
        thread.join(timeout - time_elapsed)
        if thread.is_alive():
            raise RuntimeError("Service call took longer than max timeout of :", timeout, "seconds")
        else:
            results.append(thread.result)
    return list(zip(inputs, results))

if __name__ == "__main__":
    import doctest
    doctest.testmod()
