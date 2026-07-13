<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreVolunteerRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     * Public signup — no auth required.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            'name'    => ['required', 'string', 'max:255'],
            'email'   => ['required', 'email', 'max:255'],
            'type'    => ['required', 'string', 'in:volunteer,booking'],
            'date'    => ['required_if:type,booking', 'nullable', 'date', 'after_or_equal:today'],
            'guests'  => ['required_if:type,booking', 'nullable', 'integer', 'min:1', 'max:50'],
            'message' => ['required', 'string', 'max:5000'],
        ];
    }
}
