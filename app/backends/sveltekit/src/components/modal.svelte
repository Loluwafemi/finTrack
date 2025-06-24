<script lang="ts">
    export let modalActive;
    export let expenses: Array<{name: string|null, cost: number|null}>;


    let budgetPayload: {name: string |null, cost: number|null} = {
        name: null,
        cost: null
    }

    function addExpense() {
        if (budgetPayload.cost && budgetPayload.name) {

            expenses.push(budgetPayload)
            
            modalActive = false   
        }
    
    }
</script>


<div class="relative z-10" aria-labelledby="dialog-title" role="dialog" aria-modal='false'>
    <div class="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="false">

    <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
      <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 class="text-base font-semibold text-gray-900" id="dialog-title">Add Expense To your Budget</h3>
                <div class="mt-2">
                    <div>
                        <input bind:value={budgetPayload.name} type="text" placeholder="Expense title" class="p-2 m-2" />
                        <input bind:value={budgetPayload.cost} type="text" placeholder="Cost of Expense" class="p-2 m-2" />
                    </div>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
            <button 
            on:click={addExpense}
            type="button" class="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 sm:ml-3 sm:w-auto">Submit</button>
            
            <button
            on:click={()=>{
                modalActive = false
            }}
            type="button" class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto">Cancel</button>
          </div>
        </div>
      </div>
    </div>
    
    </div>




</div>