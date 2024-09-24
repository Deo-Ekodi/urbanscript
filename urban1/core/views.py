from django.shortcuts import render, redirect
from .forms import RoomForm
from .services import GeminiAPI

def home(request):
    if request.method == 'POST':
        form = RoomForm(request.POST, request.FILES)
        if form.is_valid():
            description = form.cleaned_data['description']
            image = request.FILES.get('image')
            suggestions = GeminiAPI.generate_suggestions(description, image)
            return render(request, 'core/index.html', {
                'form': form,
                'suggestions': suggestions
            })
    else:
        form = RoomForm()
    return render(request, 'index.html', {'form': form})
