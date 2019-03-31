from threading import Thread
from datetime import datetime

DEFAULT_TIMEOUT = 10

"""
Class which extends Thread to expose a result from the target (input) function.
"""
class ResultThread(Thread):
    def run(self):
        self.result = self._target()
    def get_result(self):
        return self.result

def get_now():
    return datetime.now().timestamp()

def call_parallel(funcs, timeout=None):
    """
    Takes in a list of functions, which are then run asynchronously, and returns a list of their results.
    Doctest below.

    >>> from time import sleep

    >>> def sleep_func_gen(timeout):
    ...     def sleep_func():
    ...         sleep(timeout)
    ...         return timeout
    ...     return sleep_func

    >>> calls = [sleep_func_gen(5), sleep_func_gen(1), sleep_func_gen(3), sleep_func_gen(5),]

    >>> call_parallel([])
    []

    >>> call_parallel(calls)
    [5, 1, 3, 5]

    >>> call_parallel(calls, timeout=2)
    [None, 1, None, None]
    """
    if timeout == None:
        timeout = DEFAULT_TIMEOUT
    threads = []
    results = []

    start_time = get_now()
    for func in funcs:
        new_thread = ResultThread(None, target=func, daemon=True)
        threads.append(new_thread)
        new_thread.start()
    for thread in threads:
        time_elapsed = get_now() - start_time
        thread.join(timeout - time_elapsed)
        # If the thread is still alive, it's running past the timeout.
        if thread.is_alive():
            results.append(None)
        else:
            results.append(thread.get_result())
    return results

if __name__ == "__main__":
    import doctest
    doctest.testmod()
